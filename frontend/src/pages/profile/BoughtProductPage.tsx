import React from "react";
import { useParams } from "react-router-dom";
import useProductDetails from "@/lib/hooks/useProductDetails";
import useFileDownload from "@/lib/hooks/useFileDownload";
import { useAuth } from "@/lib/hooks/useAuth";
import { Link } from "react-router-dom";
import { CheckCircle, Download } from "lucide-react";
import { useAccess } from "@/lib/hooks/useAccess";
import usePopulatedUserTransactions from "@/lib/hooks/usePopulatedUserTransactions";

interface BoughtProductPageProps {}

const BoughtProductPage: React.FC<BoughtProductPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useProductDetails(Number(id));
  const { downloadFile, loading: downloadLoading } = useFileDownload();
  const { user } = useAuth();
  const {
    data: transactions,
    error: transactionsError,
    isLoading: transactionsLoading,
  } = usePopulatedUserTransactions(user?.id || "0");

  const {
    fileIds: fileNames,
    error: accessError,
    isLoading: accessLoading,
  } = useAccess(data?.userFileIds || []);

  if (isLoading || accessLoading) return <p>Loading...</p>;
  if (error || accessError)
    return <p>Error: {error?.message || accessError?.message}</p>;

  const handleDownload = (filePath: string) => {
    downloadFile(filePath);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-3 gap-12">
      <main className="lg:col-span-2">
        <div className="flex items-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-500 mr-2" />
          <h1 className="text-3xl font-bold text-green-600">
            Purchase Successful
          </h1>
        </div>
        <h2 className="text-2xl font-bold mb-4">{data?.title}</h2>
        <p className="text-gray-700 mb-4">{data?.description}</p>
        <p className="text-gray-900 font-bold mb-2">
          Price: ${data?.priceFull}.
          {data?.priceChange.toString().padStart(2, "0")}
        </p>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Files</h2>
          {fileNames &&
            Object.entries(fileNames).map(([fileId, fileInfo]) => (
              <div
                key={fileId}
                className="flex items-center justify-between mb-2"
              >
                <span className="text-gray-700">{fileInfo.fileName}</span>
                <button
                  onClick={() => handleDownload(fileInfo.filePath)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                  disabled={downloadLoading}
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
        </div>
      </main>
      <aside className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <h2 className="text-2xl font-semibold mb-4">Other Bought Products</h2>
        {transactionsLoading ? (
          <p>Loading...</p>
        ) : transactionsError ? (
          <p>Error: {transactionsError.message}</p>
        ) : (
          <ul className="space-y-4">
            {transactions?.map((transaction) => (
              <li
                key={transaction.id}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-700">
                      <strong>Product:</strong>{" "}
                      {transaction.productListing?.title}
                    </p>
                    <p className="text-gray-700">
                      <strong>Amount:</strong> ${transaction.amount}
                    </p>
                    <p className="text-gray-700">
                      <strong>Date:</strong>{" "}
                      {new Date(
                        transaction.transactionDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    to={`/profile/bought-products/${transaction.productListingId}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Product
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
};

export default BoughtProductPage;
