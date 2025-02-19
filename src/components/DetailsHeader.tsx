import { Link } from "react-router-dom";
import DefaultArtistImg from '@/assets/images/defaultartist.jpg';

interface Artist {
  id: string;
  name: string;
  attributes?: {
    artwork: {
      url: string;
    };
  };
}

interface Song {
  key: string;
  title: string;
  subtitle: string;
  images?: {
    coverart: string;
  };
  artists?: Artist[];
  genres?: {
    primary: string;
  };
}

interface DetailsHeaderProps {
  artistId?: string;
  artistData?: { artists?: Record<string, Artist> };
  songData?: Song;
}

export const DetailsHeader = ({ artistId, artistData, songData }: DetailsHeaderProps) => {
  const artist = artistId ? artistData?.artists?.[artistId] : undefined;
  
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-b from-transparent to-black sm:h-48 h-28"></div>

      <div className="absolute inset-0 flex items-center">
        <img
          alt="art"
          src={
            artistId && artist?.attributes?.artwork?.url
              ? artist.attributes.artwork.url.replace("{w}", "500").replace("{h}", "500")
              : songData?.images?.coverart || DefaultArtistImg // Fallback image
          }
          className="
            sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2
            shadow-xl shadow-black
          "
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artist?.name : songData?.title}
          </p>
          {!artistId && songData?.artists?.[0] && (
            <Link to={`/artists/${songData.artists[0].id}`}>
              <p className="text-base text-gray-400 mt-2">{songData?.subtitle}</p>
            </Link>
          )}

          <p className="text-base text-gray-400 mt-2">
            {artistId ? artist?.name : songData?.genres?.primary}
          </p>
        </div>
      </div>

      <div className="w-full sm:h-44 h-24"></div>

    </div>
  );
}
