/* Libraries */
import { Link } from "react-router-dom";

/* App modules imports */
import { useAuth } from "@contexts/AuthContext";

function Navbar() {
  const authContext = useAuth();

  return (
    <div className="flex h-16 w-full flex-none flex-row-reverse gap-6 bg-background-700 px-6 py-2">
      <Link className="aspect-square h-full" to="/profile">
        <img
          className="rounded-full object-cover hover:ring-2 hover:ring-primary-500"
          src="https://media.printables.com/media/prints/609705/images/4843766_f3a15f19-e7ee-4661-b553-2533084ac8fa_dcb27d2e-db17-433d-8f60-1d129843482d/th-387312948.png"
        ></img>
      </Link>
      {authContext.isAuthenticated && <button onClick={authContext.logout}>Log out</button>}
    </div>
  );
}

export default Navbar;
