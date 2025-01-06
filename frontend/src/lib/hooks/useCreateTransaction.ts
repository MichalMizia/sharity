import axios from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { API_URL } from "../auth";

interface TransactionDTO {
  id?: number;
  transactionDate: string;
  amount: number;
  status: string;
  productListingId: number;
  userId: string;
}

const createTransaction = async (
  transaction: TransactionDTO
): Promise<TransactionDTO> => {
  const response = await axios.post(`${API_URL}/transactions`, transaction, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
};

const useCreateTransaction = (): UseMutationResult<
  TransactionDTO,
  Error,
  TransactionDTO
> => {
  return useMutation({ mutationFn: createTransaction });
};

export default useCreateTransaction;
