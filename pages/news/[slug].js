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
