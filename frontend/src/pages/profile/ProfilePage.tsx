import AvatarImageForm from "@/components/forms/AvatarImageForm";
import Button from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/hooks/useAuth";
import useUserTransactions from "@/lib/hooks/useUserTransactions";
import { Link, Navigate } from "react-router-dom";

interface ProfilePageProps {}

const ProfilePage = ({}: ProfilePageProps) => {
  const { user } = useAuth();
  const {
    data: transactions,
    error,
    isLoading,
  } = useUserTransactions(user?.id || "0");

  if (!user) {
    return <Navigate to="/login" />;
  }

  console.log(user);
  console.log();

  return (
    <div className="flex h-full w-full flex-col items-stretch justify-start overflow-y-auto overflow-x-hidden px-4 pb-6 pt-0 xs:pt-6 lg:px-8">
      <div className="relative flex flex-wrap items-center justify-between">
        <div className="z-[2] flex flex-col items-start gap-2 pt-8 xs:flex-row xs:items-center xs:pt-0">
          <div className="">
            <h2 className="text-h4 font-semibold text-gray-800">
              Hello, {user?.username.split(" ")[0]}
            </h2>
            <p className="max-w-md text-sm text-text_readable sm:text-h6">
              Fill out your data and add documents to get clients.
            </p>
          </div>
        </div>
        <Link to={`/profile/add-product`} title="View your profile">
          <Button variant="outlined" size="large" className="text-gray-700">
            Add a product
          </Button>
        </Link>
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
        {/* <ImageUpdateForm imgSrc={user.image} id={user._id} /> */}
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center">
        <div className="border-r border-gray-300 flex-1">
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
                        {transaction.productListingTitle}
                      </p>
                      <p className="text-gray-700">
                        <strong>Amount:</strong> ${transaction.amount}
                      </p>
                      <p className="text-gray-700">
                        <strong>Status:</strong> {transaction.status}
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
        </div>

        <div className="flex-1">
          <AvatarImageForm
            // imgSrc={user.avatar}
            id={user.id}
            username={user.username}
            imgSrc={user.imageSrc}
          />
        </div>
      </div>

      {/* <DescriptionUpdateForm id={user._id} summary={user.summary} /> */}
      {/* <Separator className="my-4 bg-gray-300" /> */}

      {/* <MainContentForm userId={user._id} content={userData.content || ""} /> */}
    </div>
  );
};

export default ProfilePage;
