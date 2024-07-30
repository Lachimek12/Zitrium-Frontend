/* Libraries */
import { Outlet } from "react-router-dom";

/* App modules imports */
import Footer from "@components/Footer";

function MainLayout() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className="flex-none">
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
