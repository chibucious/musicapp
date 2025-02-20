import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "@/redux/store";
import { Loader, SongCard } from "@/components";
import { worldcharts } from "@/utils/worldchart_data";
import { SongT } from "@/redux/features/playerSlice";
import { ChartSongT } from "@/types";


const AroundYou = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [songAroundCountry, setSongAroundCountry] = useState<ChartSongT[]>([]);
  const { activeSong, isPlaying } = useSelector((state: RootState) => 
    state.player
  );

  useEffect(() => {
    axios.get(`https://api.country.is`)
      .then((res) => {
        const detectedCountry = res?.data?.country;
        setCountry(detectedCountry);

        // Filter songs that match the detected country
        const filteredSongs = worldcharts.filter((song: SongT) =>
          song.countrycode.includes(detectedCountry)
        );

        setSongAroundCountry(filteredSongs);
      })
      .catch((err) => console.error("Error fetching country:", err))
      .finally(() => setLoading(false));
  }, [country]);
  

  if(loading) return <Loader title="Loading songs around you" />

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You {''}
        <span className="font-black">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songAroundCountry?.map((song, i) => (
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

export default AroundYou