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

const SongCard = ({ song, i, isPlaying, activeSong, entiredata }: SongCardProps ) => {
  // Dispatch make us add changes to our cake for eg.
  const dispatch = useDispatch();

  const handlePauseClick =()=>{
    dispatch(playPause(false));
  };

  const handlePlayClick =()=>{
    dispatch(setActiveSong({ song, entiredata, i }));
    dispatch(playPause(true));
  };

  return (
    <div  key={i} className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80
    backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black
        bg-opacity-50 group-hover:flex
        ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden' }`}>
          <PlayPause 
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={song.images?.coverart} />
      </div>

      <div className="mt-4 flex flex-col">
          <p className="font-semibold text-lg text-white truncate">
            <Link to={`/songs/${song?.key}`}>
              {song.title}
            </Link>
          </p>
          <p className="text-sm truncate text-gray-300 mt-1">
            <Link to={song.artists ? `/artists/${song?.artists[0]?.id}` : '/top-artists'}>
              {song.subtitle || "Unknown Subtitle"}
            </Link>
          </p>
      </div>
    </div>
  )
}

export default SongCard