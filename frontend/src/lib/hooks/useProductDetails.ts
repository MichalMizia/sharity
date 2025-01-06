import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { API_URL } from "../auth";

interface ProductDetails {
  id: number;
  title: string;
  description: string;
  priceFull: number;
  priceChange: number;
  category: string;
  tags: string[];
  user: { email: string; username: string; imageSrc: string; id: number };
  userFileIds: number[];
  createdAt: string;
}

const fetchProductDetails = async (id: number): Promise<ProductDetails> => {
  const response = await axios.get(`${API_URL}/product-listings/${id}`);
  console.log(response.data);
  return response.data;
};

const useProductDetails = (
  id: number
): UseQueryResult<ProductDetails, Error> => {
  return useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => fetchProductDetails(id),
  });
};

export default useProductDetails;
