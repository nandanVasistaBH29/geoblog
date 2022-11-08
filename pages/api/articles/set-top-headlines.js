import Redis from "ioredis";
const DEFAULT_EXP = 60 * 60 * 6; //6hrs
const redisClient = new Redis({ url: process.env.REDIS_URL });
redisClient.connect();
export default async function handler(req, res) {
  const country = req.query.country;
  const articles = req.body.articles;

  redisClient.setex(
    `articlesByApiTEST4?country=${country}`,
    DEFAULT_EXP,
    JSON.stringify(articles)
  );
}
