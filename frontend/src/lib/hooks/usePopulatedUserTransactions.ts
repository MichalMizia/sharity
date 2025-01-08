import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { API_URL } from "../auth";

interface ProductListing {
  id: number;
  title: string;
  description: string;
  priceFull: number;
  priceChange: number;
  category: string;
  tags: string[];
  userId: number;
  userFileIds: number[];
  createdAt: string;
}

interface TransactionDTO {
  id: string;
  transactionDate: string;
  amount: number;
  status: string;
  productListingId: number;
  productListing?: ProductListing;
}

const fetchUserTransactions = async (
  userId: string
): Promise<TransactionDTO[]> => {
  const response = await axios.get(`${API_URL}/transactions/user/${userId}`, {
    withCredentials: true,
  });
  return response.data;
};

const fetchProductListing = async (
  productListingId: number
): Promise<ProductListing> => {
  const response = await axios.get(
    `${API_URL}/product-listings/${productListingId}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const fetchPopulatedUserTransactions = async (
  userId: string
): Promise<TransactionDTO[]> => {
  const transactions = await fetchUserTransactions(userId);
  const populatedTransactions = await Promise.all(
    transactions.map(async (transaction) => {
      const productListing = await fetchProductListing(
        transaction.productListingId
      );
      return { ...transaction, productListing };
    })
  );
  return populatedTransactions;
};

const usePopulatedUserTransactions = (
  userId: string
): UseQueryResult<TransactionDTO[], Error> => {
  return useQuery({
    queryKey: ["populatedUserTransactions", userId],
    queryFn: () => fetchPopulatedUserTransactions(userId),
  });
};

export default usePopulatedUserTransactions;
