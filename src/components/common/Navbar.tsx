/* Libraries */
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex-none py-2 flex flex-row-reverse bg-background-700 w-full h-16 gap-6">
      <div></div>
      <Link className="h-full aspect-square" to="/profile">
        <img
          className="object-cover rounded-full hover:ring-primary-500 hover:ring-2"
          src="https://media.printables.com/media/prints/609705/images/4843766_f3a15f19-e7ee-4661-b553-2533084ac8fa_dcb27d2e-db17-433d-8f60-1d129843482d/th-387312948.png"
        ></img>
      </Link>
      <Link to="/Login">
        <button>Log in</button>
      </Link>
    </div>
  );
}

export default Navbar;
