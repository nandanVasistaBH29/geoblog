const DEFAULT_EXP = 60 * 60 * 6; //6hrs
import { redis } from "../../../utils/redis";

export default async function handler(req, res) {
  const country = req.query.country;
  const articles = req.body.articles;
  console.log(articles, country);
  try {
    await redis.setex(
      `articlesByApiTEST:${country}`,
      DEFAULT_EXP,
      JSON.stringify(articles)
    );
    res.send({ success: "Success" });
  } catch (err) {
    res.send({ error: err });
  }
}
