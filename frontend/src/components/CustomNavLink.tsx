import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface CustomNavLinkProps {
  icon: ReactNode;
  to: string;
  children?: ReactNode;
  end?: boolean;
}

const CustomNavLink = ({ icon, to, children, end }: CustomNavLinkProps) => {
  return (
    <NavLink
      to={{ pathname: to }}
      className={({ isActive }) =>
        cn(
          isActive
            ? "text-blue-600 bg-gray-200 shadow-lg shadow-blue-600/20 border border-black/5"
            : "group",
          "flex p-2 relative rounded gap-2 items-center justify-center"
        )
      }
      end={end}
    >
      {icon}
      {children}
      <span className="absolute rounded inset-0 border-2 border-transparent border-b-blue-600/20 shadow-sm shadow-blue-500/20 group-hover:border-blue-600/50 transition-all duration-300"></span>
    </NavLink>
  );
};

export default CustomNavLink;
