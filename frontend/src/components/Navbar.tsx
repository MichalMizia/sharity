import { useAuth } from "@/lib/hooks/useAuth";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import { Home, LogIn, User, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { user, error, isLoading } = useAuth();

  const linkStyles = ({ isActive }: { isActive: boolean }) =>
    cn(
      isActive
        ? "text-blue-600 bg-gray-200 shadow-lg shadow-blue-600/20 border border-black/5"
        : "group",
      "flex p-2 relative rounded gap-2 items-center justify-center"
    );

  return (
    <header className="bg-almond z-[100] w-full py-4 lg:py-6 sticky top-0 shadow-md max-w-full">
      <nav className="custom-container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 justify-start">
          <img
            src="s_logos.svg"
            alt="Logo"
            className="w-10 h-10 rotate-180 -scale-x-100"
          />
          <p className="text-2xl font-bold">Sharity</p>
        </div>
        <div className="flex items-center josefin-sans justify-center gap-8 text-lg">
          <NavLink to="/" className={linkStyles}>
            <Home className="" />
            <p className="relative translate-y-0.5">Home</p>
            <span className="absolute rounded inset-0 border-2 border-transparent border-b-blue-600/20 shadow-sm shadow-blue-500/20 group-hover:border-blue-600/50 transition-all duration-300"></span>
          </NavLink>
        </div>
        <div className="flex items-center josefin-sans justify-center gap-6 text-lg">
          {error || isLoading ? (
            <>
              <NavLink to="/login" className={linkStyles}>
                <LogIn className="" />
                <p className="relative translate-y-0.5">Login</p>
                <span className="absolute rounded inset-0 border-2 border-transparent border-b-blue-600/20 shadow-sm shadow-blue-500/20 group-hover:border-blue-600/50 transition-all duration-300"></span>
              </NavLink>
              <NavLink to="/register" className={linkStyles}>
                <UserPlus className="" />
                <p className="relative translate-y-0.5">Register</p>
                <span className="absolute rounded inset-0 border-2 border-transparent border-b-blue-600/20 shadow-sm shadow-blue-500/20 group-hover:border-blue-600/50 transition-all duration-300"></span>
              </NavLink>
            </>
          ) : user ? (
            <>
              <NavLink to="/profile" className={linkStyles}>
                <User className="" />
                <p className="relative translate-y-0.5 leading-5">
                  Hello, <br />
                  {user.username}
                </p>
                <span className="absolute rounded inset-0 border-2 border-transparent border-b-blue-600/20 shadow-sm shadow-blue-500/20 group-hover:border-blue-600/50 transition-all duration-300"></span>
              </NavLink>
              <Logout />
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkStyles}>
                <LogIn className="" />
                <p className="relative translate-y-0.5">Login</p>
                <span className="absolute rounded inset-0 border-2 border-transparent border-b-blue-600/20 shadow-sm shadow-blue-500/20 group-hover:border-blue-600/50 transition-all duration-300"></span>
              </NavLink>
              <NavLink to="/register" className={linkStyles}>
                <UserPlus className="" />
                <p className="relative translate-y-0.5">Register</p>
                <span className="absolute rounded inset-0 border-2 border-transparent border-b-blue-600/20 shadow-sm shadow-blue-500/20 group-hover:border-blue-600/50 transition-all duration-300"></span>
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
