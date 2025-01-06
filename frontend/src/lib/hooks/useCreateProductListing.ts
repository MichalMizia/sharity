import axios from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { API_URL } from "../auth";

interface ProductListingDTO {
  title: string;
  description: string;
  priceFull: number;
  priceChange: number;
  category: string;
  tags: string[];
  userId: number;
  user: {
    id: string;
  };
  userFileIds: number[];
}

const createProductListing = async (productListing: ProductListingDTO) => {
  const response = await axios.post(
    API_URL + "/product-listings",
    productListing,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const useCreateProductListing = (): UseMutationResult<
  any,
  Error,
  ProductListingDTO
> => {
  return useMutation({ mutationFn: createProductListing });
};

export default useCreateProductListing;
