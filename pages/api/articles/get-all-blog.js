import { db } from "../../../utils/connectDb";

export default function getAll(req, res) {
  const q = `select title,description,id from Posts`;
  db.query(q, [], (err, data) => {
    if (err) {
      return res.status(404).json({ error: "some shit happened" });
    }
    res.status(200).json({ blogs: data });
  });
}
