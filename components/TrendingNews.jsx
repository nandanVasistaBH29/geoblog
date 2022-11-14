import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
const TrendingNews = ({ countryCode }) => {
  const [articles, setArticles] = useState([]);
  const route = useRouter();
  useEffect(() => {
    getAllArticles();
  }, [countryCode]);

  const getAllArticles = async () => {
    let resp;
    try {
      if (!countryCode) {
        const url = route.query;
        countryCode = url.split("/")[3];
      }
      resp = await axios.get(
        `/api/articles/top-headlines?country=${countryCode}`
      );
      if (resp.data.error === null || resp.data === null) {
        //else calculate it
        console.log("calling news api");
        const res = await axios.get(
          `https://nextjs-cors-anywhere.vercel.app/api?endpoint=https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
        );
        setArticles(res.data.articles);
        const response = await axios.post(
          `/api/articles/set-top-headlines?country=${countryCode}`,
          { articles: res.data.articles }
        );
        console.log(response);
      } else {
        setArticles(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
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
                  <Link
                    key={index}
                    href={{
                      pathname: `/news/${index}`,
                      query: { data: JSON.stringify(article) },
                    }}
                  >
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
