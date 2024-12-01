import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-auto isolate bg-bg-bg text-text-700 flex flex-col">
      <Navbar />
      <main className="flex-grow mt-4 custom-container mx-auto max-w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
