export const MainRoutes = {
    home: "/",
    topArtists: "/top-artists",
    topCharts: "/top-charts",
    aroundYou: "/around-you",
    artists: "/artists/:id",
    songs: "/songs/:id",
    search: "/search/:searchterm"
} as const;

export type MainRoutes = (typeof MainRoutes)[keyof typeof MainRoutes];