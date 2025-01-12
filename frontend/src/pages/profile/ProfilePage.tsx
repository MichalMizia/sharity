import React, { useState } from "react";
import AvatarImageForm from "@/components/forms/AvatarImageForm";
import Button from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/hooks/useAuth";
import usePopulatedUserTransactions from "@/lib/hooks/usePopulatedUserTransactions";
import { Link, Navigate } from "react-router-dom";
import DescriptionUpdateForm from "@/components/forms/DescriptionUpdateForm";
import BalanceCard from "./BalanceCard";

interface ProfilePageProps { }

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { user } = useAuth(); // Usunięto `setUser`
  const {
    data: transactions,
    error,
    isLoading,
  } = usePopulatedUserTransactions(user?.id || "0");

  // Stan kontrolujący, czy opis jest edytowany
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-full w-full flex-col items-stretch justify-start overflow-y-auto overflow-x-hidden px-4 pb-6 pt-0 xs:pt-6 lg:px-8">
      <div className="relative flex flex-wrap items-center justify-between">
        <div className="z-[2] flex flex-col items-start gap-2 pt-8 xs:flex-row xs:items-center xs:pt-0">
          <div className="">
            <h2 className="text-h4 font-semibold text-gray-800">
              Hello, {user?.username?.split(" ")[0]}
            </h2>
            <p className="max-w-md text-sm text-text_readable sm:text-h6">
              Fill out your data and add documents to get clients.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <BalanceCard />
          <Link to={`/profile/add-product`} title="View your profile">
            <Button
              variant="primary_outlined"
              size="large"
              className="text-gray-700"
            >
              Add a product
            </Button>
          </Link>
        </div>
      </div>
      <Separator className="my-4 bg-gray-300" />

      <div className="hidden xs:block">
        <div className="mb-2 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold text-gray-800">
              Zdjęcie Profilowe
            </h2>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center">
        <div className="flex-1 mr-5">
          <h3 className="text-xl font-semibold mb-4">Products you bought:</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <ul className="space-y-4">
              {transactions?.map((transaction) => (
                <li
                  key={transaction.id}
                  className="bg-white p-4 rounded-lg shadow-md"
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
                      className="text-blue-600 hover:underline min-w-[100px] ml-2"
                    >
                      View Product
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex-1 mr-5 ml-5">
          <AvatarImageForm
            id={user.id}
            username={user.username}
            imgSrc={user.imageSrc}
          />
        </div>

        <div className="flex-1 ml-5">
          <h3 className="text-xl font-semibold mb-4">Profile Description</h3>

          {/* Wyświetlanie opisu lub formularza edycji */}
          {!isEditingDescription ? (
            <div>
              <p className="text-gray-700 mb-4">
                {user.description ||
                  "You haven't provided a description yet."}
              </p>
              <Button
                onClick={() => setIsEditingDescription(true)}
                variant="primary_outlined"
                className="text-gray-700"
              >
                Edit Description
              </Button>
            </div>
          ) : (
            <DescriptionUpdateForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
