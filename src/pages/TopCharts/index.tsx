import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Loader, SongCard } from "@/components";
import { worldcharts } from "@/utils/worldchart_data";
import { ChartSongT } from "@/types";


const TopCharts = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [topCharts, setTopCharts] = useState<ChartSongT[]>([]);
  const { activeSong, isPlaying } = useSelector((state: RootState) => 
    state.player
  );

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' });

    // Shuffle worldcharts and get the first 10 songs
    const shuffledCharts = [...worldcharts].sort(() => Math.random() - 0.5);
    setTopCharts(shuffledCharts.slice(0, 10));
    setLoading(false);
  }, []);

  if(loading) return <Loader title="Loading Top Charts..." />

  return (
    <div ref={divRef} className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {topCharts?.map((song, i) => (
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
    </div>
  )
}

export default TopCharts