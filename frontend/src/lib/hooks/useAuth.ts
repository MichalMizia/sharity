import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/lib/auth";

const getUser = async () => {
  const res = await axios.get(API_URL + "/auth/session", {
    withCredentials: true,
  });
  return res.data;
};

export interface UserI {
  email: string;
  username: string;
  id: string;
  role: "USER" | "ADMIN";
}

export interface UseAuthReturn {
  user: UserI | null;
  error: Error | null;
  isLoading: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: getUser,
  });

  return { user: data, error, isLoading };
};
