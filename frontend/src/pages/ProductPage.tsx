import React from "react";
import { useParams } from "react-router-dom";
import useProductDetails from "@/lib/hooks/useProductDetails";
import { Badge } from "@/components/ui/badge";

interface ProductPageProps {}

const ProductPage: React.FC<ProductPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useProductDetails(Number(id));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg grid grid-cols-1 lg:grid-cols-3 gap-12">
      <main className="lg:col-span-2">
        {/* card */}
        <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md shadow-black/20 dark:bg-gray-800 dark:border-gray-700">
          <svg
            className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
          </svg>
          <a href="#">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {data?.title}
            </h1>
          </a>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm">
            {data?.description}
          </p>
          <p className="text-black font-bold mb-1">
            {data?.category} | ${data?.priceFull}.
            {data?.priceChange.toString().padStart(2, "0")}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {data?.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-blue-100 text-blue-800 hover:text-blue-900 hover:bg-blue-100 rounded-xl"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <a
            href={`/products/${data?.id}/purchase`}
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

        <div className="bg-gray-100 max-w-2xl mx-auto border shadow-black/20 rounded-3xl my-8 border-gray-300 shadow-md w-full p-6">
          <h2 className="text-2xl font-semibold mb-2">Seller Details</h2>
          <p className="text-gray-700">
            Additional details about the product can go here.
          </p>
        </div>
      </main>
      <aside className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        <ul className="space-y-4">
          <li className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-blue-600">
              Related Product 1
            </h3>
            <p className="text-gray-700">
              Short description of the related product.
            </p>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-blue-600">
              Related Product 2
            </h3>
            <p className="text-gray-700">
              Short description of the related product.
            </p>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-blue-600">
              Related Product 3
            </h3>
            <p className="text-gray-700">
              Short description of the related product.
            </p>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default ProductPage;
