import { useEffect, useState } from "react";
import { ArtistCard, Loader } from "@/components";
import { worldcharts } from "@/utils/worldchart_data";
import { ArtistT } from "@/types";
import { SongT } from "@/redux/features/playerSlice";
import DefaultArtistImg from '@/assets/images/defaultartist.jpg';
import { musicImage } from "@/utils/imageConstants";

const TopArtists = () => {
  const [loading, setLoading] = useState(true);
  const [topArtists, setTopArtists] = useState<ArtistT[]>([]);

  useEffect(() => {
    const artistsMap = new Map();

    worldcharts.forEach((song: SongT) => {
      song.artists.forEach((artist: ArtistT) => {
        if (!artistsMap.has(artist.id)) {
          artistsMap.set(artist.id, {
            id: artist.id,
            name: artist.name,
            image: song.images?.coverart === musicImage ? DefaultArtistImg : song.images?.coverart || "", // Use cover art as the artist image
          });
        }
      });
    });

    setTopArtists(Array.from(artistsMap.values()));
    setLoading(false);
  }, []);



  if(loading) return <Loader title="Loading Top Artists..." />

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Artists
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {topArtists?.map((artist) => (
          <ArtistCard 
            key={artist.id} 
            artist={artist}
          />
        ))}
      </div>
    </div>
  )
}

export default TopArtists