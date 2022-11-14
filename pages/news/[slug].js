import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
//added env
import Header from "../../components/Header";

const OneNews = ({}) => {
  const [article, setArticle] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const { data } = getQueryParams(window.location.search);
    const art = JSON.parse(data);
    setArticle(art);
    if (art.url) {
      console.log("====================================");
      console.log(art.url);
      console.log("====================================");
      makeApiCall(art.url);
    }
  }, []);
  const getQueryParams = (query) => {
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split("&")
          .reduce((params, param) => {
            let [key, value] = param.split("=");
            params[key] = value
              ? decodeURIComponent(value.replace(/\+/g, " "))
              : "";
            return params;
          }, {})
      : {};
  };
  const makeApiCall = async (url) => {
    await fetch("/api/scrapData", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url),
    })
      .then((response) => response.json())
      .then((data) => {
        setContent(data.p);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <>
        <main>
          <Header />
          <article className="text-w-3xl mx-auto p-5 max-w-5xl">
            <img
              className="max-w-full h-auto rounded-lg shadow-2xl	shadow-orange-500/50 "
              src={article.urlToImage}
            />

            <h1 className="text-3xl mt-10 mb-3">{article.title}</h1>
            <h2 className="text-xl font-light text-gray-300 mb-2">
              {article.description}
            </h2>
            <section className="items-center space-x-2">
              {content === [] ? (
                <h1>Scrapping</h1>
              ) : (
                <>
                  {content.map((para, index) => {
                    return (
                      <p key={index} className="m-2 font-semibold">
                        {para}
                      </p>
                    );
                  })}
                </>
              )}
            </section>
            <div className="flex items-center space-x-2">
              <p className="font-extralight text-sm">
                Blog Post By
                <span className="text-orange-600">{article.author}</span> -
                Published @ {article.publishedAt}
              </p>
            </div>

            <a href={article.url} className="font-sm">
              Original Article
            </a>
          </article>
        </main>
      </>
    </div>
  );
};

export default OneNews;

/**
 *  for (let i = 0; i < allArticles.length; i++) {
          if (allArticles[i].title === title) {
            fetch("/api/scrapData", {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(allArticles[i].url),
            })
              .then((response) => response.json())
              .then((data) => {
                setContent(data.p);
              })
              .catch((error) => {
                console.error("Error:", error);
              });

            correctIdx = i;
            setArticle({
              title: allArticles[i].title,
              author: allArticles[i].author,
              description: allArticles[i].description,
              urlToImage: allArticles[i].urlToImage,
              publishedAt: allArticles[i].publishedAt,
              url: allArticles[i].url,
            });
            return;
          }
 */
