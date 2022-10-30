import { useEffect, useState } from "react";
import Link from "next/link";
const TrendingNews = ({ countryCode }) => {
  const [articles, setArticles] = useState([]);

  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  useEffect(() => {
    fetch(
      `https://saurav.tech/NewsAPI/top-headlines/category/general/${countryCode}.json`,
      requestOptions
    )
      .then((response) => response.json())

      .then((result) => setArticles(result["articles"].slice(0, 15)))
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <div className="mt-4  p-2 rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-6 p-2 lg:p-6 lg:mt-6">
      {articles === [] ? (
        <h3>Loading...</h3>
      ) : (
        <>
          {articles.map((article, index) => {
            return (
              <div>
                {
                  <Link
                    key={article.title}
                    href={`/news/${article.title + "@" + countryCode}`}
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
                            {article.description} by {article.author}
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
