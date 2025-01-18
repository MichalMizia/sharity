import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

interface ResetPasswordPageProps {}

interface IFormInput {
  email: string;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/password/reset-password",
        null,
        {
          params: {
            email: data.email,
          },
        }
      );

      console.log("Response: ", res);

      toast.success("Password reset link sent to your email");
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Failed to send password reset link");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <div className="relative w-full max-w-4xl flex items-stretch justify-start">
        {/* first card */}
        <div className="bg-almond-dark rounded-l-lg p-8 prose shadow-lg shadow-black/30 border border-black/10 h-full w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-black">How to do it?</h2>
          <ul className="marker:text-zinc-800">
            <li className="mb-2">Enter your email</li>
            <li className="mb-2">
              Click the link on your email and enter new password
            </li>
          </ul>
        </div>
        {/* second card */}
        <div className="relative z-10 shadow-black/30 border -translate-x-10 border-black/20 bg-white p-8 rounded-lg shadow-xl h-full w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
