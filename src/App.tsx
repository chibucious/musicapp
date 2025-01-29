import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/Main.layout";
import { MainRoutes } from "@/router/routes";
import Home from "@/pages/Home";
import TopArtists from "./pages/TopArtists";
import TopCharts from "./pages/TopCharts";
import AroundYou from "./pages/AroundYou";
import Artists from "./pages/Artists";
import Songs from "./pages/Songs";
import Search from "./pages/Search";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: MainRoutes.home,
        element: <Home />
      },
      {
        path: MainRoutes.topArtists,
        element: <TopArtists />
      },
      {
        path: MainRoutes.topCharts,
        element: <TopCharts />
      },
      {
        path: MainRoutes.aroundYou,
        element: <AroundYou />
      },
      {
        path: MainRoutes.artists,
        element: <Artists />
      },
      {
        path: MainRoutes.songs,
        element: <Songs />
      },
      {
        path: MainRoutes.search,
        element: <Search />
      }
    ],
  }
]);