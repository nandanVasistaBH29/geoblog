import Redis from "ioredis";
const redisClient = new Redis({ url: process.env.REDIS_URL });
redisClient.connect();
export default async function handler(req, res) {
  const country = req.query.country;
  console.log("hi" + country);

  redisClient.get(
    `articlesByApiTEST4?country=${country}`,
    async (err, articles) => {
      if (err) console.error(err);
      else if (articles != null) {
        console.log("hit", articles);
        return res.send(JSON.parse(articles));
      } else {
        return res.send({ error: "no data" });
      }
    }
  );
}
