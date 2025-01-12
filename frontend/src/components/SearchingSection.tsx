import React, { useState } from "react";
import useSearchProductListings from "@/lib/hooks/useSearchProductListings";

const SearchProductListings = () => {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(0);
    const limit = 10;

    const { data: productListings, isLoading, isError, error } = useSearchProductListings({
        keyword,
        limit,
        page,
    });

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPage(0); // Reset to the first page whenever a new search is performed
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-3xl mx-auto">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search products..."
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={!keyword.trim()}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none disabled:opacity-50"
                >
                    Search
                </button>
            </form>

            {/* Loading / Error States */}
            {isLoading && <p className="text-gray-500">Loading...</p>}
            {isError && (
                <p className="text-red-500">
                    Error: {error?.message || "Something went wrong."}
                </p>
            )}

            {/* Product Listings */}
            {productListings?.length ? (
                <ul className="space-y-4">
                    {productListings.map((product) => (
                        <li
                            key={product.id}
                            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
                        >
                            <h3 className="text-lg font-semibold text-gray-800">
                                {product.title}
                            </h3>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-blue-600 font-medium mt-2">
                                Price: ${product.priceFull}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                !isLoading && (
                    <p className="text-gray-500 text-center">No results found.</p>
                )
            )}

            {/* Pagination Buttons */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0 || isLoading}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={isLoading}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SearchProductListings;
