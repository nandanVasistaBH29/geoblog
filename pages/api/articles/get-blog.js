import { db } from "../../../utils/connectDb";

export default function getParticular(req, res) {
  const id = req.query.id;
  console.log(id);
  const q = `select * from Posts where id=${id}`;
  db.query(q, [], (err, data) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    res.status(200).json({ blog: data });
  });
}
