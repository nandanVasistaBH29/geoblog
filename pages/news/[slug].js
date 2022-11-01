import { async } from "@firebase/util";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../../components/Header";

const OneNews = () => {
  const [country, setCountry] = useState("");
  const detectCountry = async () => {
    const res = await fetch(
      `https://ipinfo.io?token=${process.env.NEXT_PUBLIC_IP_API_TOKEN}`
    );
    const result = await res.json();
    // console.dir(result);

    setCountry(result.country);
  };
  const router = useRouter();
  const { slug } = router.query;
  const title = slug;
  const countryCode = country;
  const [article, setArticle] = useState({});
  const [content, setContent] = useState([]);

  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  useEffect(() => {
    detectCountry();
    if (countryCode === undefined) {
      <h1>Sorry Something went wrong</h1>;
      router.push("/");
    }
    let allArticles = [],
      correctIdx = -1;
    fetch(
      `https://saurav.tech/NewsAPI/top-headlines/category/general/${countryCode.toLowerCase()}.json`,
      requestOptions
    )
      .then((response) => response.json())

      .then((result) => {
        allArticles = result["articles"].slice(0, 16);

        for (let i = 0; i < allArticles.length; i++) {
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
          }
        }
      })
      .catch((error) => console.log("error", error));
  }, [country]);

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
