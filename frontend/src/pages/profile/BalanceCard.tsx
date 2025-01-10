import { API_URL } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface BalanceCardProps {}

const BalanceCard = ({}: BalanceCardProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      return (
        await axios.get(API_URL + "/auth/balance", { withCredentials: true })
      ).data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-blue-500 bg-gradient-to-br min-w-lg from-red-500/60 to-indigo-500/40 inline-flex items-center justify-center px-3 py-1.5 rounded-[4px] text-white hover-circle-overlay border-blue-600 shadow-inner border-2 relative overflow-hidden">
      <strong className="mr-[0.75ch]">Balance:</strong> {data}$
    </div>
  );
};

export default BalanceCard;
