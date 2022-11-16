import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import TrendingNews from "../components/TrendingNews";
import { AiFillCrown } from "react-icons/ai";
// sanity
import { sanityClient, urlFor } from "../utils/sanity";

// all the type defination are there in typings.d.ts
import { Post } from "../typings";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
interface Props {
  posts: [Post];
  countryCode?: string;
}
function Home({ posts }: Props): JSX.Element {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  useEffect(() => {
    detectCountry();
  }, []);
  const detectCountry = async () => {
    const res = await fetch(
      `https://ipinfo.io?token=${process.env.NEXT_PUBLIC_IP_API_TOKEN}`
    );
    const result = await res.json();
    // console.dir(result);
    update(result.country, result.city);
  };
  const update = (country: string, city: string) => {
    setCity(city);
    setCountry(country);
  };
  return (
    <div className="w-screen">
      <Head>
        <title>Geo Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="w-screen">
        <Banner />
        <h2 className="mt-4  font-bold p-2 text-4xl text-orange-500 hover:underline md:text-5xl">
          Originals
        </h2>
        <div className="w-screen rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-6 p-2 lg:p-6 lg:mt-6  shadow-2xl	shadow-orange-500/50">
          {posts.map((post, index) => {
            return (
              <div>
                <Link key={post._id} href={`/post/${post.slug.current}`}>
                  <div className="overflow-hidden group cursor-pointer border rounded-lg shadow-2xl	shadow-cyan-500/50">
                    {post.mainImage && (
                      <img
                        className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out "
                        src={urlFor(post.mainImage).url()!}
                      />
                    )}
                    <div className="flex justify-between p-5 bg-white">
                      <div>
                        <p className="text-xl font-pold">{post.title}</p>
                        <span className="font-bold text-xl md:text-2xl">
                          {post.premium && (
                            <div className="flex items-center justify-start">
                              <AiFillCrown className="text-orange-600" />
                              <h3 className="text-green-400">Pro</h3>
                            </div>
                          )}
                        </span>
                        <br />
                        <p className="text-sm">
                          {post.description} by {post.author.name}
                        </p>
                      </div>
                      {post.author.image ? (
                        <img
                          className="h-12 w-12 rounded-full"
                          src={urlFor(post.author.image).url()}
                        />
                      ) : (
                        <h3>{post.author.name}</h3>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <h2 className="mt-4 font-bold p-2 text-4xl text-cyan-500 hover:underline md:text-5xl">
          Trending News In {city},{country}
        </h2>
        {country !== "" ? (
          country !== undefined && (
            <TrendingNews
              key={country.toLowerCase()}
              countryCode={country.toLowerCase() || "us"}
            />
          )
        ) : (
          <div role="status">
            <svg
              className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <Link href="/write">
          <h2 className="mt-4 font-bold p-2 text-4xl text-orange-500 hover:underline md:text-5xl">
            Wanna Write Blogs For Us Click here
          </h2>
        </Link>
        <h2 className="mt-4 font-bold p-2 text-4xl text-cyan-500 hover:underline md:text-5xl">
          Check Out Whats Trending Accross The Globe
        </h2>

        <div className="mt-4 p-2 flex justify-around items-center ">
          <Link href="news/country/cn">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              <h3>
                <span className=" text-6xl lg:text-9xl	">🇨🇳</span>
              </h3>
            </button>
          </Link>
          <Link href="/news/country/in">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              <h3>
                <span className="text-6xl lg:text-9xl	">🇮🇳</span>
              </h3>
            </button>
          </Link>
          <Link href="/news/country/us">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              <h3>
                <span className=" text-6xl lg:text-9xl	">🇺🇸</span>
              </h3>
            </button>
          </Link>
          <Link href="/news/country/fr">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              <h3>
                <span className=" text-6xl lg:text-9xl	">🇫🇷</span>
              </h3>
            </button>
          </Link>
          <Link href="/news/country/ru">
            <button
              type="button"
              className="text-white  bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              <h3>
                <span className=" text-6xl lg:text-9xl	">🇷🇺</span>
              </h3>
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

// ssr

export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
  _id,
  title,
  author->{
    name,
    image
  },
  description,
  mainImage,
  premium,
  slug
}`;
  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts, // props are passed from here to up
    },
  };
};
export default Home;
