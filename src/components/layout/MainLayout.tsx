/* Libraries */
import { Outlet } from "react-router-dom";

/* App modules imports */
import Navbar from "@components/Navbar";

function MainLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
