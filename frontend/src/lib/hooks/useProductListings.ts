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

interface ProductListingsQueryParams {
  sortByTime?: boolean;
  limit?: number;
}

const fetchProductListings = async ({
  sortByTime = false,
  limit = 10,
}: ProductListingsQueryParams): Promise<ProductListing[]> => {
  const response = await axios.get(`${API_URL}/product-listings`, {
    params: {
      sortByTime,
      limit,
    },
  });
  return response.data;
};

const useProductListings = (
  params: ProductListingsQueryParams
): UseQueryResult<ProductListing[], Error> => {
  return useQuery({
    queryKey: ["productListings"],
    queryFn: () => fetchProductListings(params),
  });
};

export default useProductListings;
