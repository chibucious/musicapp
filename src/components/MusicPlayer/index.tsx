import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextSong, prevSong, playPause } from '@/redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import { RootState } from '@/redux/store';

const MusicPlayer = (): JSX.Element => {
    const dispatch = useDispatch();
    const {
      activeSong,
      currentSongs,
      currentIndex,
      isActive,
      isPlaying,
    } = useSelector((state: RootState) => state.player);

    const [duration, setDuration] = useState<number>(0);
    const [seekTime, setSeekTime] = useState<number>(0);
    const [appTime, setAppTime] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0.3);
    const [repeat, setRepeat] = useState<boolean>(false);
    const [shuffle, setShuffle] = useState<boolean>(false);
  
    useEffect(() => {
      if (currentSongs.length) {
        dispatch(playPause(true));
      }
    }, [currentIndex, dispatch, currentSongs.length]);

    const handlePlayPause = (): void => {
        if (!isActive) return;
        dispatch(playPause(!isPlaying));
    };

    const handleNextSong = (): void => {
        dispatch(playPause(false));
        const nextIndex = shuffle
            ? Math.floor(Math.random() * currentSongs.length)
            : (currentIndex + 1) % currentSongs.length;
        dispatch(nextSong({ index: nextIndex }));
    };
    
    const handlePrevSong = (): void => {
        dispatch(playPause(false));
        const prevIndex = shuffle
            ? Math.floor(Math.random() * currentSongs.length)
            : currentIndex === 0
            ? currentSongs.length - 1
            : currentIndex - 1;
        dispatch(prevSong({ index: prevIndex }));
    };

    return (
        <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
            <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
            <div className="flex-1 flex flex-col items-center justify-center">
                <Controls
                    isPlaying={isPlaying}
                    isActive={isActive}
                    repeat={repeat}
                    setRepeat={setRepeat}
                    shuffle={shuffle}
                    setShuffle={setShuffle}
                    currentSongs={currentSongs}
                    handlePlayPause={handlePlayPause}
                    handlePrevSong={handlePrevSong}
                    handleNextSong={handleNextSong}
                />
                <Seekbar
                    value={appTime}
                    min={0}
                    max={duration}
                    onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setSeekTime(Number(event.target.value))
                    }
                    setSeekTime={setSeekTime}
                    appTime={appTime}
                />
                <Player
                    activeSong={activeSong}
                    volume={volume}
                    isPlaying={isPlaying}
                    seekTime={seekTime}
                    repeat={repeat}
                    currentIndex={currentIndex}
                    onEnded={handleNextSong}
                    onTimeUpdate={(event: React.SyntheticEvent<HTMLAudioElement>) =>
                        setAppTime((event.target as HTMLAudioElement).currentTime)
                    }
                    onLoadedData={(event: React.SyntheticEvent<HTMLAudioElement>) =>
                        setDuration((event.target as HTMLAudioElement).duration)
                    }
                />
            </div>
            <VolumeBar
                value={volume}
                min={0}
                max={1}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setVolume(Number(event.target.value))
                }
                setVolume={setVolume}
            />
        </div>
    );
};

export default MusicPlayer;
