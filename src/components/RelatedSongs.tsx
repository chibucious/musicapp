import { ChartSongT } from "@/types";
import SongBar from "./SongBar";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong, SongT } from "@/redux/features/playerSlice";

interface RelatedSongsProps {
  data: ChartSongT[];
  isPlaying: boolean;
  activeSong: SongT | null;
}

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
}:RelatedSongsProps ) => {
  
  const dispatch = useDispatch();
  
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  
  const handlePlayClick = (song: ChartSongT, i: number) => {
    dispatch(setActiveSong({ song, entiredata: data, i }));
    dispatch(playPause(true));
  };
  
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs</h1>

      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => {
          // Extract the first artist's ID or fallback to an empty string
          const artistId = song.artists?.[0]?.id || "";

          return (
            <SongBar
              key={`${song.key}-${artistId}`} // Ensure a unique key
              song={song}
              i={i}
              artistId={artistId}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          );
        })}
      </div>
    </div>
  )
}

export default RelatedSongs