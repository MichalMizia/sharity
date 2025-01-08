import React from "react";
import { useParams } from "react-router-dom";
import useProductDetails from "@/lib/hooks/useProductDetails";
import { Badge } from "@/components/ui/badge";
import useProductListings from "@/lib/hooks/useProductListings";

interface ProductPageProps { }

const ProductPage: React.FC<ProductPageProps> = () => {
  const { id } = useParams<{ id: string }>();

  const { data: productData, error: productError, isLoading: productIsLoading } = useProductDetails(Number(id));

  const { data: latestProductsData, error: latestProductsError, isLoading: latestProductsIsLoading } = useProductListings({
    sortByTime: true,
    limit: 5,
  });

  if (productIsLoading) return <p>Loading product details...</p>;
  if (productError) return <p>Error: {productError.message}</p>;

  if (latestProductsIsLoading) return <p>Loading latest products...</p>;
  if (latestProductsError) return <p>Error loading latest products: {latestProductsError.message}</p>;

  const filteredLatestProducts = latestProductsData?.filter(
    (latestProduct) => latestProduct.id !== Number(id)
  );

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg grid grid-cols-1 lg:grid-cols-3 gap-12">
      <main className="lg:col-span-2">
        {/* Main Product Card */}
        <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md shadow-black/20 dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {productData?.title}
            </h1>
          </a>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm">
            {productData?.description}
          </p>
          <p className="text-black font-bold mb-1">
            {productData?.category} | ${productData?.priceFull}.
            {productData?.priceChange.toString().padStart(2, "0")}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {productData?.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-blue-100 text-blue-800 hover:text-blue-900 hover:bg-blue-100 rounded-xl"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <a
            href={`/products/${productData?.id}/purchase`}
            className="inline-flex font-medium items-center text-blue-600 hover:underline"
          >
            Buy now
            <svg
              className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
              />
            </svg>
          </a>
        </div>

        {/* Seller Details Section */}
        <div className="bg-gray-100 max-w-2xl mx-auto border shadow-black/20 rounded-3xl my-8 border-gray-300 shadow-md w-full p-6">
          <h2 className="text-2xl font-semibold mb-2">Seller Details</h2>
          <p className="text-gray-700">
            Additional details about the product can go here.
          </p>
        </div>
      </main>

      {/* Latest Products Section */}
      <aside className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <h2 className="text-2xl font-semibold mb-4">Latest Products</h2>
        <ul className="space-y-4">
          {filteredLatestProducts?.length ? (
            filteredLatestProducts.map((latestProduct) => (
              <li key={latestProduct.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <a href={`/products/${latestProduct.id}`} className="text-xl font-semibold text-blue-600">
                  {latestProduct.title}
                </a>
                <p className="text-gray-700">{latestProduct.description}</p>
              </li>
            ))
          ) : (
            <p>No latest products available.</p>
          )}
        </ul>
      </aside>
    </div>
  );
};

export default ProductPage;
