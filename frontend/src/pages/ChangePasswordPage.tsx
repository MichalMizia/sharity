import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "@/lib/auth";

interface ChangePasswordPageProps {}

interface IFormInput {
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePasswordPage: React.FC<ChangePasswordPageProps> = () => {
  const [params] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const token = params.get("token");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log(data.newPassword);
    try {
      const res = await axios.post(
        API_URL + `/password/change-password`,
        null,
        {
          params: { token, password: data.newPassword },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Response: ", res);

      toast.success("Password changed successfully");
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <div className="relative w-full max-w-4xl flex items-stretch justify-start">
        {/* first card */}
        <div className="bg-almond-dark rounded-l-lg p-8 prose shadow-lg shadow-black/30 border border-black/10 h-full w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Change Password
          </h2>
          <ul className="marker:text-zinc-800">
            <li className="mb-2">Enter your new password</li>
            <li className="mb-2">Confirm your new password</li>
          </ul>
        </div>
        {/* second card */}
        <div className="relative z-10 shadow-black/30 border -translate-x-10 border-black/20 bg-white p-8 rounded-lg shadow-xl h-full w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Change Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                {...register("newPassword", { required: true })}
              />
              {errors.newPassword && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmNewPassword"
                className="block text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                autoComplete="new-password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                {...register("confirmNewPassword", { required: true })}
              />
              {errors.confirmNewPassword && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
