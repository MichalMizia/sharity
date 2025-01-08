import AvatarImageForm from "@/components/forms/AvatarImageForm";
import Button from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/hooks/useAuth";
import usePopulatedUserTransactions from "@/lib/hooks/usePopulatedUserTransactions";
import { Link, Navigate } from "react-router-dom";

interface ProfilePageProps { }

const ProfilePage = ({ }: ProfilePageProps) => {
  const { user } = useAuth();
  const {
    data: transactions,
    error,
    isLoading,
  } = usePopulatedUserTransactions(user?.id || "0");

  if (!user) {
    return <Navigate to="/login" />;
  }

  console.log(user);
  console.log(transactions);

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
          <Button
            variant="primary_outlined"
            size="large"
            className="text-gray-700"
          >
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
        <div className="flex-1">
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
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Your Description:</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const response = await fetch(`/users/${user.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description: formData.get('description') }),
              });

              if (response.ok) {
                alert("Description updated successfully!");
              } else {
                alert("Failed to update description.");
              }
            }}
          >
            <textarea
              name="description"
              defaultValue={user.description}
              className="w-full p-2 border rounded"
              rows={4}
            ></textarea>
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
              Update Description
            </button>
          </form>
        </div>
      </div>

      {/* <DescriptionUpdateForm id={user._id} summary={user.summary} /> */}
      {/* <Separator className="my-4 bg-gray-300" /> */}

      {/* <MainContentForm userId={user._id} content={userData.content || ""} /> */}
    </div>
  );
};

export default ProfilePage;
