import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Loader, SongCard } from "@/components";
import { worldcharts } from "@/utils/worldchart_data";
import { ArtistT, ChartSongT } from "@/types";
import { SongT } from "@/redux/features/playerSlice";


const Search = () => {
  const { searchterm } = useParams();
  const [loading, setLoading] = useState(true);
  const [filteredCharts, setFilteredCharts] = useState<ChartSongT[]>([]);
  const { activeSong, isPlaying } = useSelector((state: RootState) => 
    state.player
  );

  useEffect(() => {
    setLoading(true);
    
    // Filter worldcharts based on search term (title, subtitle or artist name)
    const results = worldcharts.filter((song: SongT) =>
      (song.title?.toLowerCase().includes(searchterm?.toLowerCase() || "") ?? false) ||
      (song.subtitle?.toLowerCase().includes(searchterm?.toLowerCase() || "") ?? false) ||
      song.artists.some((artist: ArtistT) => artist.name?.toLowerCase().includes(searchterm?.toLowerCase() || ""))
    );
    

    setFilteredCharts(results);
    setLoading(false);
  }, [searchterm]);

  if (loading) return <Loader title="Searching for songs..." />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="text-gray-400">{searchterm}</span>
      </h2>

      {filteredCharts.length > 0 ? (
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {filteredCharts.map((song, i) => (
            <SongCard 
              key={song.key} 
              song={song} 
              isPlaying={isPlaying}
              activeSong={activeSong}
              entiredata={worldcharts}
              i={i} 
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-lg text-center">No results found for "{searchterm}" for now</p>
      )}
    </div>
  )
}

export default Search;