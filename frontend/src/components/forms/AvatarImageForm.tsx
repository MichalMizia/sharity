import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

interface AvatarImageFormProps {
  id: string;
  username: string;
  imgSrc: string | null;
}

const AvatarImageForm: React.FC<AvatarImageFormProps> = ({
  id,
  imgSrc,
  username,
}: AvatarImageFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

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
    formData.append("image", file);

    try {
      const response = await axios.post(
        `http://localhost:8080/users/${id}/profile-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("File upload failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Profile Image</h2>
      {imgSrc && (
        <div className="flex justify-center mb-4">
          <img
            src={imgSrc}
            alt={`${username}'s profile`}
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
        </div>
      )}
      <form onSubmit={handleFileUpload}>
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default AvatarImageForm;
