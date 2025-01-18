import { API_URL } from "@/lib/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

interface BalanceCardProps {}

const BalanceCard = ({}: BalanceCardProps) => {
  // Uzyskujemy dostęp do queryClient
  const queryClient = useQueryClient();

  // Zapytanie GET do pobrania salda
  const { data, error, isLoading } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      return (
          await axios.get(API_URL + "/auth/balance", { withCredentials: true })
      ).data;
    },
  });

  // Mutation do resetowania salda
  const resetBalanceMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(API_URL + "/auth/balance", {}, { withCredentials: true });
      return response.data;
    },
    onSuccess: () => {
      // Po sukcesie odśwież saldowanie
      queryClient.invalidateQueries(["balance"]);

      toast.success("Money send to your account");
    },
    onError: (error: any) => {
      // console.error("Error resetting balance:", error);
      toast.error("Failed to withdraw money");
    },
  });

  const handleResetClick = () => {
    // Sprawdzamy, czy saldo wynosi 0
    if (data === 0) {
      toast.error("The balance is already 0.");
    } else {
      resetBalanceMutation.mutate();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
      <div className="flex items-center gap-6">
        {/* Wyświetlanie salda */}
        <div
            className="bg-blue-500 bg-gradient-to-br min-w-lg from-red-500/60 to-indigo-500/40 inline-flex items-center justify-center px-4 py-2.5 rounded-[4px] text-white hover-circle-overlay border-blue-600 shadow-inner border-2 relative overflow-hidden">
          <strong className="mr-[0.75ch]">Balance:</strong> {data}$
        </div>

        {/* Przycisk do resetowania salda */}
        <div
            onClick={handleResetClick}
            className="cursor-pointer bg-blue-500 bg-gradient-to-br min-w-lg from-red-500/60 to-indigo-500/40 inline-flex items-center justify-center px-4 py-2.5 rounded-[4px] text-white hover-circle-overlay border-blue-600 shadow-inner border-2 relative overflow-hidden"
        >
          <strong className="mr-[0.75ch]">
            {resetBalanceMutation.isLoading ? "Processing..." : "Reset Balance"}
          </strong>
        </div>
      </div>
  );
};

export default BalanceCard;
