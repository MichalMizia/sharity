import { login } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

interface LoginPageProps {}

interface IFormInput {
  username: string;
  password: string;
}

const LoginPage = ({}: LoginPageProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const res = await login({
        email: data.username,
        password: data.password,
      });
      toast.success("Login successful!");
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      console.log(res);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <div className="relative w-full max-w-4xl flex items-stretch justify-start">
        {/* first card */}
        <div className="bg-almond-dark rounded-l-lg p-8 prose shadow-lg shadow-black/30 border border-black/10 h-full w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-black">Login Perks</h2>
          <ul className="marker:text-zinc-800">
            <li className="mb-2">Access exclusive content</li>
            <li className="mb-2">Save your preferences</li>
            <li className="mb-2">Get personalized recommendations</li>
          </ul>
        </div>
        {/* second card */}
        <div className="relative z-10 shadow-black/30 border -translate-x-10 border-black/20 bg-white p-8 rounded-lg shadow-xl h-full w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                id="username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
