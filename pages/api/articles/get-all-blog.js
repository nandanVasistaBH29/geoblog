import { pool } from "../../../utils/connectDb";

export default function getAll(req, res) {
  const q = `select title,description,pid from Posts`;
  pool.getConnection(function (err, db) {
    if (err) return res.json(err);
    db.query(q, [], (err, data) => {
      if (err) {
        return res.status(404).json({ error: err });
      }
      res.status(200).json({ blogs: data });
    });
    db.close();
  });
}
