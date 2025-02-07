import { FaPauseCircle, FaPlayCircle } from "react-icons/fa"

interface PlayPauseProps {
  isPlaying: boolean;
  activeSong: { title?: string } | null;
  song: { title?: string };
  handlePause: () => void;
  handlePlay: () => void;
}

const PlayPause = (
  { isPlaying, activeSong, song, handlePause, handlePlay }: PlayPauseProps
) => {

  const isActive = activeSong?.title === song.title;

  return isPlaying && isActive ? (
    <FaPauseCircle
      size={35}
      className="text-gray-300 cursor-pointer"
      onClick={handlePause}
      role="button"
      aria-label="Pause"
    />
  ) : (
    <FaPlayCircle
      size={35}
      className="text-gray-300 cursor-pointer"
      onClick={handlePlay}
      role="button"
      aria-label="Play"
    />
  );
}

export default PlayPause