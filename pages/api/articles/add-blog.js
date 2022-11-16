import { db } from "../../../utils/connectDb";
import AWS from "aws-sdk";
export default async function handler(req, res) {
  const obj = { ...req.body };
  const body = obj.body;
  // need to store this body in S3
  const fileName = `${obj.uid}/UPLOAD_ON` + Date.now() + ".txt";
  const S3 = new AWS.S3({
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    },
  });
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: body,
  };
  S3.upload(params, async (error, data) => {
    if (error) {
      console.log(error);
      return res.status(404).json({ error: error });
    }
    const q = `insert into Posts (title,description,bodyURL,slug,categories,uid) values ("${obj.title}","${obj.description}","${data.Location}","${obj.slug}","${obj.categories}",${obj.uid})`;
    db.query(q, [], (err, data) => {
      if (err) {
        return res.status(404).json({ error: err });
      }
      res.status(200).json({ success: "YAY new blog created" });
    });
  });
}
