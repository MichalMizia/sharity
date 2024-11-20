import { logout } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import { LogOutIcon } from "lucide-react";
import { toast } from "react-toastify";

interface LogoutProps {}

const Logout = ({}: LogoutProps) => {
  const queryClient = useQueryClient();

  const custom_logout = async () => {
    try {
      await logout();
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success("Logout successful!");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <button
      onClick={async () => {
        await custom_logout();
      }}
      type="button"
      className="w-full gap-2 bg-almond-700 hover:bg-almond-650 flex items-center justify-center  text-white px-4 py-2 shadow-md transition duration-300"
    >
      Logout
      <LogOutIcon
        size={16}
        strokeWidth={3}
        className="relative -translate-y-[2px]"
      />
    </button>
  );
};

export default Logout;
