import AvatarImageForm from "@/components/forms/AvatarImageForm";
import Button from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/hooks/useAuth";
import { Link, Navigate } from "react-router-dom";

interface ProfilePageProps {}

const ProfilePage = ({}: ProfilePageProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-full w-full flex-col items-stretch justify-start overflow-y-auto overflow-x-hidden px-4 pb-6 pt-0 xs:pt-6 lg:px-8">
      <div className="relative flex flex-wrap items-center justify-between">
        <div className="z-[2] flex flex-col items-start gap-2 pt-8 xs:flex-row xs:items-center xs:pt-0">
          <AvatarImageForm
            // imgSrc={user.avatar}
            id={user.id}
            username={user.username}
          />
          <div className="">
            <h2 className="text-h4 font-semibold text-gray-800">
              Cześć, {user?.username.split(" ")[0]}
            </h2>
            <p className="max-w-md text-sm text-text_readable sm:text-h6">
              Uzupełniaj swój profil i przyciągaj klientów
            </p>
          </div>
        </div>
        <Link to={`/profile/add-product`} title="Zobacz swój Profil">
          <Button
            variant="outlined"
            size="large"
            className="hidden text-gray-700 md:flex"
          >
            Zobacz swój Profil
          </Button>
          <p className="mt-1 translate-y-1 text-sm text-blue-500 underline hover:opacity-80 md:hidden">
            Zobacz swój Profil
          </p>
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
      {/* <DescriptionUpdateForm id={user._id} summary={user.summary} /> */}
      {/* <Separator className="my-4 bg-gray-300" /> */}

      {/* <MainContentForm userId={user._id} content={userData.content || ""} /> */}
    </div>
  );
};

export default ProfilePage;
