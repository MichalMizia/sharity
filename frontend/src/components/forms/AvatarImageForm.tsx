import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface AvatarImageFormProps {
  id: string;
  username: string;
}

const AvatarImageForm: React.FC<AvatarImageFormProps> = ({
  id,
  username,
}: AvatarImageFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  console.log(id, username);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Posting");
      const response = await axios.get("http://localhost:8080/files/upload", {
        withCredentials: true,
      });
      //   const response = await axios.post(
      //     "http://localhost:8080/files/upload",
      //     formData,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //       withCredentials: true,
      //     }
      //   );
      setMessage(response.data);
    } catch (error) {
      setMessage("File upload failed");
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <form onSubmit={handleFileUpload}>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AvatarImageForm;
