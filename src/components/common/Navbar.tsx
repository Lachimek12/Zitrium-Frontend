/* Libraries */
import { useNavigate } from "react-router-dom";

/* App modules imports */
import { useAuth } from "@contexts/AuthContext";
import ProfileFrame from "@components/ProfileFrame";
import { SIGMA_IMAGE_SRC } from "@utils/constants";

function Navbar() {
  const authContext = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className={`flex h-20 w-full flex-none flex-row-reverse gap-6 bg-secondary2-500 px-6 py-2`}>
        <ProfileFrame
          image={SIGMA_IMAGE_SRC}
          clickEvent={() => {
            navigate("/profile");
          }}
        />
        {authContext.isAuthenticated && <button onClick={authContext.logout}>Log out</button>}
      </div>
      <div className="flex h-[2px] w-full flex-none bg-gradient-to-b from-border-600 via-border-500 to-border-600" />
    </>
  );
}

export default Navbar;
