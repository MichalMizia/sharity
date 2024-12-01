import {
  BookOpen,
  GraduationCap,
  Dumbbell,
  Hammer,
  Briefcase,
  Code,
  Music,
  Paintbrush,
  MoveRight,
} from "lucide-react";

interface CategorySectionProps {}

const categories = [
  { name: "Research Papers", icon: <BookOpen /> },
  { name: "University Courses", icon: <GraduationCap /> },
  { name: "Fitness Guides", icon: <Dumbbell /> },
  { name: "DIY Projects", icon: <Hammer /> },
  { name: "Business Templates", icon: <Briefcase /> },
  { name: "Coding Resources", icon: <Code /> },
  { name: "Music Sheets", icon: <Music /> },
  { name: "Art Tutorials", icon: <Paintbrush /> },
];

const CategorySection = ({}: CategorySectionProps) => {
  return (
    <section className="py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Share by Category
          </h2>

          <a
            href="#"
            title=""
            className="flex items-center text-base font-medium text-primary-700 hover:underline dark:text-primary-500"
          >
            See more categories
            <MoveRight className="ml-4" />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <a
              key={category.name}
              href="#"
              className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              {category.icon}
              <span className="text-sm font-medium text-gray-900 dark:text-white ml-2">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
