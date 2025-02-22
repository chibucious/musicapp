import { MainRoutes } from '@/router/routes';
import { HiOutlineHashtag, HiOutlineHome, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';

export type GenreT = {
  title: string;
  value: string;
};

export const genres: GenreT[] = [
  { title: 'Pop', value: 'POP' },
  { title: 'Hip-Hop', value: 'HIP_HOP_RAP' },
  { title: 'Afrobeats', value: 'AFROBEATS' },
  { title: 'Dance', value: 'DANCE' },
  { title: 'Electronic', value: 'ELECTRONIC' },
  { title: 'Soul', value: 'SOUL_RNB' },
  { title: 'Alternative', value: 'ALTERNATIVE' },
  { title: 'Rock', value: 'ROCK' },
  { title: 'Latin', value: 'LATIN' },
  { title: 'Film', value: 'FILM_TV' },
  { title: 'Country', value: 'COUNTRY' },
  { title: 'Worldwide', value: 'WORLDWIDE' },
  { title: 'Reggae', value: 'REGGAE_DANCE_HALL' },
  { title: 'House', value: 'HOUSE' },
  { title: 'K-Pop', value: 'K_POP' },
];

export const links = [
  { name: 'Discover', to: MainRoutes.home, icon: HiOutlineHome },
  { name: 'Around You', to: MainRoutes.aroundYou, icon: HiOutlinePhotograph },
  { name: 'Top Artists', to: MainRoutes.topArtists, icon: HiOutlineUserGroup },
  { name: 'Top Charts', to: MainRoutes.topCharts, icon: HiOutlineHashtag },
];
