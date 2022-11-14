import { db } from "../../../utils/connectDb";

export default function getAll(req, res) {
  const q = `select * from Posts`;
  db.query(q, [], (err, data) => {
    if (err) {
      return res.status(404).json({ error: "some shit happened" });
    }
    res.status(200).json({ blogs: data });
  });
}
export function getParticular(req, res) {
  const q = `select * from Posts where id=${req.query.id}`;
  db.query(q, [], (err, data) => {
    if (err) {
      return res.status(404).json({ error: "some shit happened" });
    }
    res.status(200).json({ blog: data });
  });
}
