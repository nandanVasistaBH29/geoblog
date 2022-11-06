// this very similar to update student but one main catch
// is to hash the new password

// /api/student-forgot-password?email=<>phone=<>
// PUT
import { db } from "../../../utils/connectDb";
import bcrypt from "bcryptjs";

export default function handler(req, res) {
  const { email, password, phone } = req.body;
  // first check if email exists
  const q = `select * from students where email='${email} and phone='${phone}';`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ err });
    }
    if (data.length === 0) return res.status(404).json("Email Doesn't exists");
  });
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const q2 = `update students set password="${hash}" where email='${email}';`;
  db.query(q2, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ err });
    }
    if (data.length === 0) return res.status(404).json("something went wrong");
    res.status(201).json("updated");
  });
}
