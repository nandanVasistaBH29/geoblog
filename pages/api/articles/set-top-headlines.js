import Redis from "ioredis";
const DEFAULT_EXP = 60 * 60 * 6; //6hrs
const redisClient = new Redis(process.env.REDIS_URL);
redisClient.connect();
export default async function handler(req, res) {
  const country = req.query.country;
  const articles = req.body.articles;
  try {
    redisClient.setex(
      `articlesByApiTEST?country=${country}`,
      DEFAULT_EXP,
      JSON.stringify(articles)
    );
    res.send({ success: "Success" });
  } catch (err) {
    res.send({ err });
  }
}
