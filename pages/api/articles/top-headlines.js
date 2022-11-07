import axios from "axios";
import Redis from "ioredis";
const DEFAULT_EXP = 60 * 60 * 4; //4hrs
const proxyUrl = "https://nextjs-cors-anywhere.vercel.app/";
const redisClient = new Redis({ url: process.env.REDIS_URL });
redisClient.connect();
export default async function handler(req, res) {
  const country = req.query.country;
  console.log(country);

  redisClient.get(
    `articlesByApiTEST?country=${country}`,
    async (err, articles) => {
      if (err) console.error(err);
      else if (articles != null) {
        console.log("hit", country);
        return res.send(JSON.parse(articles));
      } else {
        console.log("miss");
        const response = await axios.get(
          `${proxyUrl}https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWS_API_KEY}`
        );
        // console.log(response.data);
        redisClient.setex(
          `articlesByApiTEST?country=${country}`,
          DEFAULT_EXP,
          JSON.stringify(response.data)
        );
        res.send(response.data);
      }
    }
  );
}

/*
  // To query /v2/top-headlines
  // All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2
    .topHeadlines({
      sources: "bbc-news,the-verge",
      q: "bitcoin",
      category: "business",
      language: "en",
      country: "us",
    })
    .then((response) => {
      console.log(response);
      /*
    {
      status: "ok",
      articles: [...]
    }
  */
