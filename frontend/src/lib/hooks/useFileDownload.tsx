import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../auth";

const downloadFile = async (filename: string) => {
  const response = await axios.get(API_URL + `/public/files/${filename}`, {
    responseType: "blob", // Important
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const useFileDownload = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: downloadFile,
  });

  return {
    downloadFile: mutate,
    loading: isPending,
    error: isError ? (error as Error).message : null,
  };
};

export default useFileDownload;
