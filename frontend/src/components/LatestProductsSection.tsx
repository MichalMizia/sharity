import React from "react";
import useProductListings from "@/lib/hooks/useProductListings";
import { Link } from "react-router-dom";
import { PackageSearchIcon, SendToBack, SignpostBig } from "lucide-react";

interface LatestProductsSectionProps {}

const LatestProductsSection: React.FC<LatestProductsSectionProps> = () => {
  const { data, error, isLoading } = useProductListings({
    sortByTime: true,
    limit: 10,
  });

  return (
    <section className="py-8 antialiased md:pb-16 md:pt-24 w-full">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <>
              <div className="transition relative ease-in-out delay-150 duration-300 p-6 rounded-2xl border-blue-500/50 border bg-gray-100 shadow-lg shadow-blue-500/20 ">
                <div className="flex flex-col items-stretch justify-end h-full">
                  <div className="w-full">
                    <SignpostBig className="w-12 h-12 m-auto mb-4 mt-2" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-600">
                    Latest Products
                  </h3>
                  <div className="text-gray-800 flex items-start justify-center flex-wrap">
                    <span className="font-bold text-black mr-[1ch]">
                      Find what you need
                    </span>
                    {[""].map((tag) => (
                      <span className="text-xs bg-blue-500/20 rounded-2xl border border-black/10 py-1 px-2 mr-[1ch]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {data?.length
                ? data.map((listing) => (
                    <Link
                      to={`/products/${listing.id}`}
                      key={listing.id}
                      className="transition relative ease-in-out delay-150 duration-300 p-6 rounded-2xl border bg-gray-100 hover:bg-gray-200 shadow-sm shadow-black/20 "
                    >
                      <div className="flex flex-col items-stretch justify-end h-full">
                        <div className="text-gray-800 absolute top-4 right-4">
                          ${listing.priceFull}.
                          {listing.priceChange.toString().padStart(2, "0")}
                        </div>
                        <div className="w-full">
                          <PackageSearchIcon className="w-12 h-12 m-auto mb-4 mt-2" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-blue-600">
                          {listing.title}{" "}
                        </h3>
                        <div className="text-gray-800 flex items-start justify-center flex-wrap">
                          <span className="font-bold text-black mr-[1ch]">
                            {listing.category}
                          </span>
                          {listing.tags.map((tag) => (
                            <span className="text-xs bg-blue-500/20 rounded-2xl border border-black/10 py-1 px-2 mr-[1ch]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))
                : null}
            </>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestProductsSection;
