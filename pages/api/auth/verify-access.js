import { pool } from "../../../utils/connectDb";
// 1-> adfree idofPurcase
// 2-> become a writer
// 3-> become a elite member
export default function handler(req, res) {
  const { email, access } = req.body;
  if (!email) {
    return res.status(404).json({ error: "Don't have write access" });
  }
  let q;
  console.log({ email, access });
  if (access === "1") {
    q = `select id from users where email="${email}" and isPro=1`;
  } else if (access === "2") {
    q = `select id from users where email="${email}" and isWriter=1`;
  }
  pool.getConnection(function (err, db) {
    if (err) return res.json(err);
    db.query(q, [], (err, data) => {
      if (err) {
        db.release();
        return res.status(404).json({ error: err });
      }
      if (data.length == 0) {
        db.release();
        return res.status(404).json({ error: "Don't have write access" });
      }
      res.status(200).json({ uid: data });
      db.release();
    });
  });
}
