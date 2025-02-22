import { MusicPlayer, Searchbar, Sidebar, TopPlay } from "@/components";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const MainLayout = (): JSX.Element => {
  // useSelector is a React-Redux hook that allows you to extract data from the Redux store's state
  const { activeSong } = useSelector((state: RootState) => state.player);

  return (
    <div className="relative flex">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />
        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col">
          {/* Main Content */}
          <div className="flex-1 h-fit pb-40">
            <Outlet />
          </div>

          {/* TopPlay Section - Scrollable when overflowing */}
          <div className="xl:sticky relative xl:top-0 xl:h-[calc(100vh-72px)] xl:max-h-[calc(100vh-72px)] xl:overflow-y-auto hide-scrollbar order-last xl:order-none">
            <TopPlay />
          </div>
        </div>
      </div>

      {/* Music Player */}
      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default MainLayout;