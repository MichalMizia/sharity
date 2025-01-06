import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/lib/auth";

const getAccess = async (data: number[]) => {
  const res = await axios.post(
    API_URL + "/transactions/users/check-access",
    data,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

interface UserFileInfoI {
  fileName: string;
  filePath: string;
}

export interface UseAccessReturn {
  fileIds: Record<number, UserFileInfoI> | null;
  error: Error | null;
  isLoading: boolean;
}

export const useAccess = (accessData: number[]): UseAccessReturn => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["auth", accessData],
    queryFn: () => getAccess(accessData),
  });

  return { fileIds: data, error, isLoading };
};
