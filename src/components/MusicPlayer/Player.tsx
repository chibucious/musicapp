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

    // Control play/pause based on isPlaying state
    useEffect(() => {
        if (ref.current) {
        if (isPlaying) {
            ref.current.play();
        } else {
            ref.current.pause();
        }
        }
    }, [isPlaying]);

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
        src={activeSong?.hub?.actions[1]?.uri}
        ref={ref}
        loop={repeat}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={onLoadedData}
        />
    );
};
  
export default Player;