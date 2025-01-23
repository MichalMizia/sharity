import React from "react";
import useProductListings from "@/lib/hooks/useProductListings";
import { Link } from "react-router-dom";
import { PackageSearchIcon, SignpostBig, VerifiedIcon } from "lucide-react";

interface LatestProductsSectionProps {}

const LatestProductsSection: React.FC<LatestProductsSectionProps> = () => {
  const { data, error, isLoading } = useProductListings({
    sortByTime: true,
    limit: 7,
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
                  <h3 className="text-xl h-12 flex items-center line-clamp-2 justify-center font-semibold mb-2 text-blue-600">
                    Latest Products
                  </h3>
                  <div className="text-gray-800 mt-1 gap-0.5 flex items-start justify-center flex-col">
                    <span className="font-bold text-black mr-[1ch]">
                      Find what you need
                    </span>
                    <div className="flex items-start justify-start flex-wrap">
                      {["quick", "reliable"].map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-blue-500/15 text-gray-700 rounded-sm border border-black/10 py-[3px] px-1.5 mr-[1ch]"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-xs flex gap-0.5 items-center justify-center bg-blue-500/15 text-gray-700 rounded-sm border border-black/10 py-[3px] px-1.5">
                        <VerifiedIcon
                          className="text-blue-500 translate-y-[1px]"
                          size={14}
                          strokeWidth={3}
                        />
                        verified
                      </span>
                    </div>
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
                        <h3 className="text-xl h-12  line-clamp-2 justify-center font-semibold mb-2 text-blue-600">
                          {listing.title}{" "}
                        </h3>
                        <div className="text-gray-800 mt-1 gap-0.5 flex items-start justify-center flex-col">
                          <span className="font-bold text-black mr-[1ch]">
                            {listing.category}
                          </span>
                          <div className="flex items-start justify-start flex-wrap">
                            {listing.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs bg-blue-500/15 text-gray-700 rounded-sm border border-black/10 py-[3px] px-1.5 mr-[1ch]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
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
