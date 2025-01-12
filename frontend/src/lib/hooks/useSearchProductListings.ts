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

interface ProductListingsSearchQueryParams {
    keyword: string;
    limit?: number;
    page?: number;
}

const fetchProductListingsBySearch = async ({
    keyword,
    limit = 10,
    page = 0,
}: ProductListingsSearchQueryParams): Promise<ProductListing[]> => {
    const response = await axios.get(`${API_URL}/product-listings/search`, {
        params: {
            keyword,
            limit,
            page,
        },
    });
    return response.data;
};

const useSearchProductListings = (
    params: ProductListingsSearchQueryParams
): UseQueryResult<ProductListing[], Error> => {
    return useQuery({
        queryKey: ["productListingsSearch", params.keyword, params.page],
        queryFn: () => fetchProductListingsBySearch(params),
        enabled: !!params.keyword, // Only fetch when a keyword is provided
    });
};

export default useSearchProductListings;
