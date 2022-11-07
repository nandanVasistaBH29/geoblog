import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  const url = req.body;
  let html,
    allParaTags = [];
  await axios(url)
    .then((res) => {
      html = res.data;

      const $ = cheerio.load(html);
      $("p", html).each((index, element) => {
        const p = $(element).text();
        allParaTags.push(p);
      });
    })
    .catch((err) => console.log(err));
  res.status(200).json({ p: allParaTags });
}
