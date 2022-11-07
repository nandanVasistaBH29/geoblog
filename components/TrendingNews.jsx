import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
const TrendingNews = ({ countryCode }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles();
  }, []);
  const getAllArticles = async () => {
    const res = await axios.get(
      `https://nextjs-cors-anywhere.vercel.app/api?endpoint=https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );
    console.log(countryCode);
    console.log(res);
    setArticles(res.data.articles);
  };
  return (
    <div className=" rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-6 p-2 lg:p-6 lg:mt-6">
      {articles === [] ? (
        <h3>Loading...</h3>
      ) : (
        <>
          {articles.map((article, index) => {
            return (
              <div>
                {
                  <Link key={article.title} href={"/"}>
                    <div className="overflow-hidden group cursor-pointer border rounded-lg shadow-2xl	shadow-orange-500/50  ">
                      <img
                        className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                        src={article.urlToImage}
                      />
                      <div className="flex justify-between p-5 bg-white">
                        <div>
                          <p className="text-xl font-pold">{article.title}</p>
                          <br />
                          <p className="text-sm">
                            {article.description} by{" "}
                            <span className="px-2 text-orange-500">
                              {article.author}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                }
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default TrendingNews;
