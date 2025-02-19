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
  highlightsurls?: {
    [key: string]: string;
  };
  hub?: {
    type: string;  
    actions?: { name: string; type: string; uri?: string }[];
  };
  layout?: string;
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

export interface SongT2 {
  key?: string;
  title: string;
  artists?: { name: string }[];
  sections?: { type: string; text: string[] }[];
  [key: string]: unknown; // Extendable for additional properties
}