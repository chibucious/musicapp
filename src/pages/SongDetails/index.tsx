import { DetailsHeader, Loader, RelatedSongs } from "@/components";
import { RootState } from "@/redux/store";
import { songData } from "@/utils/songdata";
import { worldcharts } from "@/utils/worldchart_data";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

const SongDetails = () => {
  const { songid } = useParams<{ songid: string }>();
  const { activeSong, isPlaying } = useSelector((state: RootState) => 
    state.player
  );
  const [loadingRelatedSongs, setLoadingRelatedSongs] = useState(true);

  // Find the song by its key
  const song = songData.find((s) => s.key === songid);

  // Find the lyrics section
  const lyricsSection = song?.sections?.find((section) => section.type === "LYRICS");

  // Find related songs from worldcharts (songs with at least one matching artist)
  // Get song artists
  const songArtists = song?.artists?.map((artist) => artist.name) || [];
  const relatedSongs = worldcharts.filter((chartSong) =>
    chartSong.artists?.some((artist) => songArtists.includes(artist.name))
  );  

  useEffect(() => {
    const timer = setTimeout(() => setLoadingRelatedSongs(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  

  return (
    <div className="flex flex-col">
      {song && <DetailsHeader artistId="" songData={song} />}

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {lyricsSection ? (
            lyricsSection.text.map((line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">Sorry, no lyrics found!</p>
          )}
        </div>
      </div>
      
      {loadingRelatedSongs ? (
        <Loader title="Fetching Related Songs..." />
      ) : (
        <RelatedSongs
          data={relatedSongs}
          isPlaying={isPlaying}
          activeSong={activeSong}
        />
      )}
    </div>
  )
}

export default SongDetails