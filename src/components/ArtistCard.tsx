import { ArtistT } from "@/types";
import { useNavigate } from "react-router-dom";

interface ArtistCardProps {
  artist: ArtistT;
}

const ArtistCard = ({ artist }: ArtistCardProps ) => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 
      backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${artist.id}`)}
    >
      <img 
        alt={artist.name} 
        src={artist.image} 
        className="w-full h-56 object-cover rounded-lg"
      />
      <p className="mt-4 text-white text-lg font-semibold text-center truncate">
        {artist.name}
      </p>
    </div>
  );
};

export default ArtistCard;
