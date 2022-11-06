import { db } from "../../../utils/connectDb";

export default function handler(req, res) {
  console.log(req.query);
  const email = req.query.q;
  const id = req.query.id;
  const q = `select * from users where email="${email}" and ${id}=1`;
  console.log(q);
  db.query(q, [], (err, data) => {
    if (err || data.length === 0) {
      return res.status(400).json("no access");
    }
    return res.json("granted");
  });
}
