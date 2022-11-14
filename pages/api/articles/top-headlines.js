import { redis } from "../../../utils/redis";
export default async function handler(req, res) {
  console.log(redis);
  const country = req.query.country;
  console.log(country);
  await redis.get(
    `articlesByApiTEST101:${country}`,
    async (error, articles) => {
      console.log(error, articles);
      if (error) {
        console.error("hoge", articles);
      } else if (articles != null) {
        return res.send(JSON.parse(articles));
      } else {
        return res.send({ error: error });
      }
    }
  );
}
