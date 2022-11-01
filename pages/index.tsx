import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import TrendingNews from "../components/TrendingNews";

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
  }, [country]);
  const detectCountry = async () => {
    const res = await fetch(
      `https://ipinfo.io?token=${process.env.NEXT_PUBLIC_IP_API_TOKEN}`
    );
    const result = await res.json();
    // console.dir(result);
    setCountry(result.country);
    setCity(result.city);
  };

  return (
    <div className="">
      <Head>
        <title>Geo Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Banner />
        <h2 className="mt-4 font-bold p-2 text-4xl text-orange-500 hover:underline md:text-5xl">
          Originals
        </h2>
        <div className="mt-4  p-2 rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-6 p-2 lg:p-6 lg:mt-6  shadow-2xl	shadow-orange-500/50">
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
        {country !== "" && country !== undefined && (
          <TrendingNews
            key={country.toLowerCase()}
            countryCode={country.toLowerCase() || "us"}
          />
        )}
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
