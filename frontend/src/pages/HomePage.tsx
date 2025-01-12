import CategorySection from "@/components/CategorySection";
import LatestProductsSection from "@/components/LatestProductsSection";
import SearchProductListings from "@/components/SearchingSection";
// import AvatarImageForm from "@/components/forms/AvatarImageForm";
import { MoveRight } from "lucide-react";

const HomePage = () => {
  return (
    <>
      <section className="isolate relative">
        <div className="absolute -z-10 h-[100vh] w-[100vw] left-1/2 -translate-x-1/2 m-auto top-[-40px] bg-no-repeat bg-[radial-gradient(circle_at_top_right,#C5DECD,#FFFFFF50)]"></div>
        <div className="absolute -z-10 h-[100vh] w-[100vw] left-1/2 -translate-x-1/2 m-auto top-[-40px] bg-no-repeat bg-[radial-gradient(circle_at_bottom_left,#CDA49750,#FFFFFF50)]"></div>
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
          <a
            href="#"
            className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
          >
            <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
              Hello
            </span>{" "}
            <span className="text-sm font-medium">
              Welcome to Sharity! Discover the new way to share learning.
            </span>
            <MoveRight color="currentColor" className="ml-4" />
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Empowering Knowledge Sharing
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
            Welcome to Sharity, your ultimate document marketplace. Effortlessly
            upload, share, and access high-quality documents, from research
            papers and university courses to fitness guides and DIY tutorials.
            Whether you're a student, professional, or hobbyist, Sharity is your
            go-to destination for valuable content. Join our community today and
            unlock a wealth of information.
          </p>

          {/*searching bar*/}
          <SearchProductListings />

          <LatestProductsSection />
        </div>
        {/* <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div> */}
      </section>

      <CategorySection />
    </>
  );
};

export default HomePage;
