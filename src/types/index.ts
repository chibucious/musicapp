export interface ChartSongT {
  key: string;
  title?: string;
  subtitle?: string;
  images?: {
    coverart?: string;
    background?: string;
  };
  artists?: {
    id: string;
    name: string;
  }[];
  genres?: string[];
  highlightsurls?: {
    [key: string]: string;
  };
  hub?: {
    type: string;  
    actions?: { name: string; type: string; uri?: string }[];
  };
  layout?: string;
  countrycode?: string[];
  properties?: Record<string, unknown>;
  share?: {
    subject?: string;
    text?: string;
    href?: string;
    image?: string;
    twitter?: string;
    html?: string;
    avatar?: string;
    snapchat?: string;
  };
  type: string;
  url?: string;  
}

export interface ArtistT {
  id: string;
  name: string;
  image?: string;
}