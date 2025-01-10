import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/lib/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";

interface DescriptionFormInputs {
  description: string;
}

const DescriptionUpdateForm: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DescriptionFormInputs>({
    defaultValues: {
      description: user?.description || "",
    },
  });

  const onSubmit: SubmitHandler<DescriptionFormInputs> = async (data) => {
    if (!data.description.trim()) {
      toast.error("Description cannot be empty");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/users/${user?.id}/description`,
        { description: data.description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success("Description updated successfully!");
    } catch (error) {
      toast.error("Failed to update description");
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Description</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none"
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
        >
          Update Description
        </button>
      </form>
    </div>
  );
};

export default DescriptionUpdateForm;
