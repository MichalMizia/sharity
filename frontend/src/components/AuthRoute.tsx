import { useAuth } from "@/lib/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRoute;
