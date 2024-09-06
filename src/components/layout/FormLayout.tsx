/* Libraries */
import { Outlet } from "react-router-dom";

/* App modules imports */
import Footer from "@components/Footer";

function FormLayout() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className="flex-none">
        <Footer />
      </div>
    </div>
  );
}

export default FormLayout;
