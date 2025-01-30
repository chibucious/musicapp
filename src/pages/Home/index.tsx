import { useEffect, useState } from "react";
import { Loader, SongCard } from "@/components";
import { genres, GenreT } from "@/utils/constants";
import { worldcharts } from "./data";

const Home = () => {
  const [loadingCharts, setLoadingCharts] = useState(true);
  const genreTitle = "Pop";

  useEffect(() => {
    const timer = setTimeout(() => setLoadingCharts(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center
        sm:flex-row flex-col mt-4 mb-10
      ">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select 
          onChange={()=>{}}
          value=""
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
          {worldcharts.map((song, i) => (
            <SongCard 
              key={song.key} 
              song={song} 
              i={i} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home