import { pool } from "../../../utils/connectDb";
// 1-> adfree idofPurcase
// 2-> become a writer
// 3-> become a elite member
export default function handler(req, res) {
  const { upgrade } = req.query;
  const { email } = req.body;
  console.log(upgrade);
  if (!upgrade || !email) {
    return res.status(404).json({ error: "no upgrade or email" });
  }
  let q;

  if (upgrade === "1") {
    //pro
    q = `update users set isPro=1 where email="${email}"`;
  } else if (upgrade === "2") {
    q = `update users set isWriter=1 where email="${email}"`;
  } else if (upgrade === "3") {
    //elitemember
    q = `update users set isEliteMember=1 where email="${email}"`;
  }
  pool.getConnection(function (err, db) {
    if (err) return res.json(err);
    db.query(q, [], (err, data) => {
      if (err) {
        db.release();
        return res.status(404).json({ error: err });
      }
      res.status(200).json("osum");
      db.release();
    });
  });
}
