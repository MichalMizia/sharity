import { useAuth } from "@/lib/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoute = () => {
  const { user, error, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
