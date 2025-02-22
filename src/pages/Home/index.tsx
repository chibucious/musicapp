import { useEffect, useRef, useState } from "react";
import { Loader, SongCard } from "@/components";
import { genres, GenreT } from "@/utils/constants";
import { worldcharts } from "@/utils/worldchart_data";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SongT } from "@/redux/features/playerSlice";

const Home = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [loadingCharts, setLoadingCharts] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  
  // const dispatch = useDispatch();
  // We pull player information from the entire state
  const { activeSong, isPlaying } = useSelector((state: RootState) => 
    state.player
  );


  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    const timer = setTimeout(() => setLoadingCharts(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Filter worldcharts by selected genre
  const filteredWorldCharts = selectedGenre === ""
    ? worldcharts
    : worldcharts.filter((song: SongT) => song.genres.includes(selectedGenre));

    const genreTitle = genres.find((genre) => genre.value === selectedGenre)?.title || "All Genres";

  return (
    <div ref={divRef} className="flex flex-col">
      <div className="w-full flex justify-between items-center
        sm:flex-row flex-col mt-4 mb-10
      ">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select 
          onChange={(e) => setSelectedGenre(e.target.value)}
          value={selectedGenre || ""}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre: GenreT) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      {loadingCharts ? (
        <Loader title="Fetching World Charts..." />
      ) : (
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {filteredWorldCharts.map((song, i) => (
            <SongCard 
              key={song.key} 
              song={song} 
              isPlaying={isPlaying}
              activeSong={activeSong}
              entiredata={filteredWorldCharts}
              i={i} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home