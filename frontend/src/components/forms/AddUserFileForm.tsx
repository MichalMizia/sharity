import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/lib/hooks/useAuth";
import { useUserFiles } from "@/lib/hooks/useUserFiles";
import { Download } from "lucide-react";
import useFileDownload from "@/lib/hooks/useFileDownload";
import { useQueryClient } from "@tanstack/react-query";

const AddUserFileForm: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const { userFiles, error, isLoading } = useUserFiles(user?.id || "");
  const { downloadFile, loading: downloadLoading } = useFileDownload();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `http://localhost:8080/users/${user?.id}/files`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setFile(null);
      queryClient.invalidateQueries({ queryKey: ["userFiles", user?.id] });
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload file");
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add User File</h2>
      <form onSubmit={handleFileUpload}>
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700"
          >
            Upload File
          </label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
        >
          Upload File
        </button>
      </form>
      <h3 className="text-xl font-semibold mt-6 mb-4">Your Files</h3>
      <div className="overflow-y-auto h-60">
        {error ? (
          <p className="text-red-500">There is nothing here.</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {userFiles?.length &&
              userFiles.map((userFile) => (
                <li
                  key={userFile.id}
                  className="text-gray-700 flex items-center justify-between"
                >
                  {userFile.fileName}
                  <button
                    onClick={() => downloadFile(userFile.filePath)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                    disabled={downloadLoading}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddUserFileForm;
