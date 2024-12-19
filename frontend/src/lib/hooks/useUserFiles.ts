// src/hooks/useUserFiles.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../auth";

const getUserFiles = async (userId: string) => {
  const res = await axios.get(API_URL + `/users/${userId}/files`, {
    withCredentials: true,
  });
  return res.data;
};

export interface UserFile {
  id: number;
  fileName: string;
  filePath: string;
}

export interface UseUserFilesReturn {
  userFiles: UserFile[] | undefined;
  error: Error | null;
  isLoading: boolean;
}

export const useUserFiles = (userId: string): UseUserFilesReturn => {
  const { data, error, isLoading } = useQuery<UserFile[], Error>({
    queryKey: ["userFiles", userId],
    queryFn: () => getUserFiles(userId),
  });

  return { userFiles: data, error, isLoading };
};
