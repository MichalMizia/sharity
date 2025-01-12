import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useSearchProductListings from "@/lib/hooks/useSearchProductListings";

const SearchProductListings = () => {
    const [keyword, setKeyword] = useState(""); // Tracks search keyword
    const [page, setPage] = useState(0); // Tracks the current page
    const limit = 5; // Results per page

    // Fetch data using the custom hook
    const { data: productListings, isLoading, isError, error } = useSearchProductListings({
        keyword,
        limit,
        page,
    });

    // Checks if the current page is the last page
    const isLastPage = !isLoading && productListings?.length < limit;

    // Use a state for debounced keyword
    const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

    // Set up debounce delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedKeyword(keyword);
        }, 500); // Delay of 500ms

        return () => clearTimeout(timer); // Clear previous timeout if the keyword changes
    }, [keyword]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
        setPage(0); // Reset page when search input changes
    };

    const truncateDescription = (description: string, limit: number = 80) => {
        return description.length > limit ? description.slice(0, limit) + "..." : description;
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-3xl mx-auto">
            {/* Search Input */}
            <div className="mb-6">
                <input
                    type="text"
                    value={keyword}
                    onChange={handleSearchChange}
                    placeholder="Search products..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Loading / Error States */}
            {isLoading && <p className="text-gray-500">Loading...</p>}
            {isError && (
                <p className="text-red-500">
                    Error: {error?.message || "Something went wrong."}
                </p>
            )}

            {/* Product Listings */}
            {debouncedKeyword.trim() && productListings?.length ? (
                <ul className="space-y-4">
                    {productListings.map((product) => (
                        <li
                            key={product.id}
                            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
                        >
                            <Link
                                to={`/products/${product.id}`}
                                className="w-full block" // Makes the entire li clickable without changing layout
                            >
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {product.title}
                                </h3>
                                <p className="text-gray-600">{truncateDescription(product.description)}</p>
                                <p className="text-blue-600 font-medium mt-2">
                                    Price: ${product.priceFull}.
                                    {product.priceChange.toString().padStart(2, "0")}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Category:&nbsp;
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                        {product.category || "Uncategorized"}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Tags:&nbsp;
                                    {product.tags?.length ? (
                                        product.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-block bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400">None</span>
                                    )}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Author: {product.user.username}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                debouncedKeyword.trim() && !isLoading && !productListings?.length && (
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
                    disabled={isLoading || isLastPage || !keyword.trim()}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SearchProductListings;
