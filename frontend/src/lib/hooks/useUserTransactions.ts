import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { API_URL } from "../auth";

interface TransactionDTO {
  id: string;
  transactionDate: string;
  amount: number;
  status: string;
  productListingId: number;
}

const fetchUserTransactions = async (
  userId: string
): Promise<TransactionDTO[]> => {
  const response = await axios.get(`${API_URL}/transactions/user/${userId}`, {
    withCredentials: true,
  });
  return response.data;
};

const useUserTransactions = (
  userId: string
): UseQueryResult<TransactionDTO[], Error> => {
  return useQuery({
    queryKey: ["userTransactions", userId],
    queryFn: () => fetchUserTransactions(userId),
  });
};

export default useUserTransactions;
