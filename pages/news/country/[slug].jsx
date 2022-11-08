import { useRouter } from "next/router";
import TrendingNews from "../../../components/TrendingNews";
import Header from "../../../components/Header";
const Country = () => {
  const route = useRouter();
  const { slug } = route.query;
  return (
    <div>
      <Header />
      {slug && (
        <h2 className="mt-4 font-bold p-2 text-4xl text-cyan-500 hover:underline md:text-5xl">
          Trending News In {slug.toUpperCase()}
        </h2>
      )}
      <TrendingNews countryCode={slug} />
    </div>
  );
};

export default Country;
