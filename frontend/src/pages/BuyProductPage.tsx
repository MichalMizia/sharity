import React from "react";
import { Navigate, useParams } from "react-router-dom";
import useProductDetails from "@/lib/hooks/useProductDetails";
import useCreateTransaction from "@/lib/hooks/useCreateTransaction";
import { useAuth } from "@/lib/hooks/useAuth";
import { toast } from "react-toastify";

const BuyProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useProductDetails(Number(id));
  const { mutate, isPending: isCreating } = useCreateTransaction();
  const { user } = useAuth();

  if (data?.user?.id == user?.id) {
    toast.error("This is your product. You can't buy it.");
    return <Navigate to="/profile" />;
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handlePurchase = () => {
    if (data && user) {
      const transaction = {
        transactionDate: new Date().toISOString(),
        amount: data.priceFull + data.priceChange / 100,
        status: "Finished",
        productListingId: data.id,
        userId: user.id,
      };

      mutate(transaction, {
        onSuccess: () => {
          toast.success("Product bought successfully!");
        },
        onError: () => {
          toast.error("Failed to buy product");
        },
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Purchase {data?.title}</h1>
      <p className="text-gray-700 mb-4">{data?.description}</p>
      <p className="text-gray-900 font-bold mb-2">
        Price: ${data?.priceFull}.
        {data?.priceChange.toString().padStart(2, "0")}
      </p>
      <button
        onClick={handlePurchase}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
        disabled={isCreating}
      >
        {isCreating ? "Processing..." : "Confirm Purchase"}
      </button>
    </div>
  );
};

export default BuyProductPage;
