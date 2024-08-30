/* Libraries */
import { useNavigate } from "react-router-dom";

/* App modules imports */
import { useAuth } from "@contexts/AuthContext";
import styles from "./navbar.module.css";
import ProfileFrame from "./ProfileFrame";

function Navbar() {
  const authContext = useAuth();
  const navigate = useNavigate();

  return (
    // border-b-2 border-[#162022]
    <>
      <div className={`flex h-20 w-full flex-none ${styles.backgroundImage} `}>
        <div className="flex flex-1 flex-row-reverse gap-6 bg-[#232E30] px-6 py-2 opacity-80">
          <ProfileFrame
            image={SIGMA_SRC}
            clickEvent={() => {
              navigate("/profile");
            }}
          />
          {authContext.isAuthenticated && <button onClick={authContext.logout}>Log out</button>}
        </div>
      </div>
      <div className={`flex h-[2px] w-full flex-none ${styles.deviderImage}`}>
        <div className="flex-1 bg-gradient-to-b from-[#3a4345] via-[#596262] to-[#3a4345] opacity-95"></div>
      </div>
    </>
  );
}

const SIGMA_SRC =
  "https://media.printables.com/media/prints/609705/images/4843766_f3a15f19-e7ee-4661-b553-2533084ac8fa_dcb27d2e-db17-433d-8f60-1d129843482d/th-387312948.png";

export default Navbar;
