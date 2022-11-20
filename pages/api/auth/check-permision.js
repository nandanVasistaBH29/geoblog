import { pool } from "../../../utils/connectDb";

export default function handler(req, res) {
  console.log(req.query);
  const email = req.query.q;
  const id = req.query.id;
  const q = `select * from users where email="${email}" and ${id}=1`;
  pool.getConnection(function (err, db) {
    if (err) return res.json(err);
    db.query(q, [], (err, data) => {
      if (err || data.length === 0) {
        db.release();
        return res.status(400).json("no access");
      }
      db.release();
      return res.json("granted");
    });
  });
}
