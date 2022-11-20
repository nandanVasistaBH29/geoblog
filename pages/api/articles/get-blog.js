import { pool } from "../../../utils/connectDb";

export default function getParticular(req, res) {
  const id = req.query.id;
  console.log(id);
  const q = `select * from Posts where pid=${id}`;
  pool.getConnection(function (err, db) {
    if (err) return res.json(err);
    db.query(q, [], (err, data) => {
      if (err) {
        return res.status(404).json({ error: err });
      }
      res.status(200).json({ blog: data });
    });
  });
}
