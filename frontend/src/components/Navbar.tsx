import { useAuth } from "@/lib/hooks/useAuth";
import { Link } from "react-router-dom";
import Logout from "./Logout";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const { user, error, isLoading } = useAuth();

  return (
    <header className="bg-almond z-10 w-full py-4 lg:py-6 sticky top-0 shadow-md max-w-full">
      <nav className="custom-container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 justify-start">
          <img
            src="s_logos.svg"
            alt=""
            className="w-10 h-10 rotate-180 -scale-x-100"
          />
          <p className="text-2xl font-bold">Sharity</p>
        </div>
        <div className="flex items-center josefin-sans justify-center gap-8 text-lg">
          <Link to="/" className="">
            Home
          </Link>
        </div>
        <div className="flex items-center josefin-sans justify-center gap-6 text-lg">
          {error || isLoading ? (
            <>
              <Link to="/login" className="">
                Login
              </Link>
              <Link to="/register" className="">
                Register
              </Link>
            </>
          ) : user ? (
            <>
              <Link
                to="/profile"
                className="flex hover:scale-[107%] transition-all duration-300 items-center justify-center"
              >
                <p className="text-sm text-text-700 mr-1">
                  Hello, <br />
                  {user.username}
                </p>
                <div className="rounded-full flex items-center justify-center text-[24px] font-bold w-12 h-12 border-black/70 bg-bg-bg shadow-md shadow-black/30 border-2">
                  {user.email.charAt(0)}
                </div>
              </Link>
              <Logout />
            </>
          ) : (
            <>
              <Link to="/login" className="">
                Login
              </Link>
            <Link to="/register" className="">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
