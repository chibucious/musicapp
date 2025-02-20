import { useRef, useEffect } from 'react';

interface PlayerProps {
    activeSong: {
      hub?: {
        actions: { uri: string }[];
      };
      images?: {
        coverart?: string;
      };
      title?: string;
      subtitle?: string;
    } | null;
    isPlaying: boolean;
    volume: number;
    seekTime: number;
    onEnded: () => void;
    onTimeUpdate: (event: React.SyntheticEvent<HTMLAudioElement>) => void;
    onLoadedData: (event: React.SyntheticEvent<HTMLAudioElement>) => void;
    repeat: boolean;
    currentIndex: number;
}
   
const Player = ({
    activeSong,
    isPlaying,
    volume,
    seekTime,
    onEnded,
    onTimeUpdate,
    onLoadedData,
    repeat,
}: PlayerProps): JSX.Element => {
    const ref = useRef<HTMLAudioElement | null>(null);

    // Get valid audio source
    const audioSrc = activeSong?.hub?.actions?.[0]?.uri || activeSong?.hub?.actions?.[1]?.uri || "";

    // Update audio source when activeSong changes
    useEffect(() => {
        if (ref.current) {
            ref.current.src = audioSrc; // Explicitly set src
            ref.current.load(); // Ensure the browser loads the new audio
        }
    }, [audioSrc]);
    
    // Control play/pause after src is loaded
    useEffect(() => {
        if (ref.current && isPlaying) {
            ref.current.play().catch((err) => console.error("Playback error:", err));
        } else if (ref.current) {
            ref.current.pause();
        }
    }, [isPlaying, audioSrc]);

    // Set volume when volume changes
    useEffect(() => {
        if (ref.current) {
        ref.current.volume = volume;
        }
    }, [volume]);

    // Update seekTime only when seekTime changes
    useEffect(() => {
        if (ref.current) {
        ref.current.currentTime = seekTime;
        }
    }, [seekTime]);

    return (
        <audio
            ref={ref}
            loop={repeat}
            onEnded={onEnded}
            onTimeUpdate={onTimeUpdate}
            onLoadedData={(e) => {
                if (isPlaying) {
                    ref.current?.play();
                }
                onLoadedData(e);
            }}
        />
    );
};
  
export default Player;