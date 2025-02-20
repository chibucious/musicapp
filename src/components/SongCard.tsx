import { ChartSongT } from "@/types";
import PlayPause from "./PlayPause";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong, SongT } from "@/redux/features/playerSlice";

interface SongCardProps {
  song: ChartSongT;
  i: number;
  isPlaying: boolean;
  activeSong: SongT | null;
  entiredata: ChartSongT[];
}

const SongCard = ({ song, i, isPlaying, activeSong, entiredata }: SongCardProps) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    console.log(song);
    console.log(entiredata);
    dispatch(setActiveSong({song,entiredata,i,}));
    dispatch(playPause(true));
  };

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80
      backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    >
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 flex justify-center items-center 
          bg-black bg-opacity-50 group-hover:flex 
          ${activeSong?.title === song.title ? "flex bg-black bg-opacity-70" : "hidden"}`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt={song.title || "Song Cover"}
          src={song.images?.coverart || "/default-cover.png"}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`} className="hover:underline">
            {song.title || "Unknown Title"}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={song.artists?.length ? `/artists/${song?.artists[0]?.id}` : "/top-artists"}
            className="hover:underline"
          >
            {song.subtitle || "Unknown Artist"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
