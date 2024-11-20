import { API_URL } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface FeaturedSectionProps {}

const getData = async () => {
  const res = await axios.get(API_URL + "/home");
  console.log(res);
  return res.data;
};

const FeaturedSection = ({}: FeaturedSectionProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: getData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <section className="mt-10 w-full max-w-4xl">
      <h3 className="text-xl font-bold mb-4">Books</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data &&
          Object.keys(data).map((str: string) => (
            <div key={str} className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-bold">{str}</h4>
              <p className="text-gray-700">{data[str]}</p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
