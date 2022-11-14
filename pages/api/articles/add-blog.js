import { db } from "../../../utils/connectDb";

export default function handler(req, res) {
  const obj = { ...req.body };
  const q = `insert into Posts (title,description,body,slug,categories,uid) values ("${obj.title}","${obj.description}","${obj.body}","${obj.slug}","${obj.categories}",${obj.uid})`;
  db.query(q, [], (err, data) => {
    if (err) {
      return res.status(404).json({ error: "some shit happened" });
    }
    res.status(200).json({ success: "YAY new blog created" });
  });
}
