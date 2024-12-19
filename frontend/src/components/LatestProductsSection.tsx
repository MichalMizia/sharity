import React from "react";
import useProductListings from "@/lib/hooks/useProductListings";

interface LatestProductsSectionProps {}

const LatestProductsSection: React.FC<LatestProductsSectionProps> = () => {
  const { data, error, isLoading } = useProductListings({
    sortByTime: true,
    limit: 10,
  });

  console.log(data);

  return (
    <section className="py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-3xl font-bold mb-8">Latest Products</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.length
              ? data?.map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {listing.title}
                    </h3>
                    <p className="text-gray-700 mb-2">{listing.description}</p>
                    <p className="text-gray-900 font-bold">
                      ${listing.priceFull}.
                      {listing.priceChange.toString().padStart(2, "0")}
                    </p>
                    <p className="text-gray-600">
                      Category: {listing.category}
                    </p>
                    <p className="text-gray-600">
                      Tags: {listing.tags.join(", ")}
                    </p>
                  </div>
                ))
              : null}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestProductsSection;
