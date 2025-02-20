import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { DetailsHeader, Loader, RelatedSongs } from "@/components";
import { RootState } from "@/redux/store";
import { songData } from "@/utils/songdata";
import { worldcharts } from "@/utils/worldchart_data";

const ArtistDetails = () => {
  const { artistid } = useParams<{ artistid: string }>();
  const { activeSong, isPlaying } = useSelector((state: RootState) => 
    state.player
  );
  const [loadingArtistDetails, setLoadingArtistDetails] = useState(true);

  // Find the artist's song entry in worldcharts
  const artistSong = worldcharts.find((s) =>
    s.artists?.some((artist) => artist.id === artistid)
  );

  // Ensure 'artists' is defined before attempting to find the artist
  const artist = artistSong?.artists ? artistSong.artists.find((artist) => artist.id === artistid) : undefined;

  // Fetch related songs by the artist
  const relatedSongs = songData.filter((song) =>
    song.artists?.some((artist) => artist.id === artistid) // Same logic for related songs
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoadingArtistDetails(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loadingArtistDetails) {
    return <Loader title="Loading Artist Songs..." />;
  }
  

  return (
    <div className="flex flex-col">
      {artist && 
        <DetailsHeader 
          artistId={artistid} 
          artistData={artist} 
        />
      }

      <RelatedSongs 
        data={relatedSongs} 
        isPlaying={isPlaying} 
        activeSong={activeSong} 
      />
      
    </div>
  )
}

export default ArtistDetails