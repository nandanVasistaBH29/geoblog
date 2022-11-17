// /api/register
// POST
import { pool } from "../../../utils/connectDb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
export default function handler(req, res) {
  const q = "select * from users where email=?";
  pool.getConnection(function (err, db) {
    if (err) return res.json(err);
    db.query(q, [req.body.email], (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ err });
      }
      if (data.length) return res.status(409).json("user already exists");
      // hash the password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const q =
        "insert into users(displayName,email,password,phone,photoURL) values (?)";
      const values = [
        req.body.displayName,
        req.body.email,
        hash,
        req.body.phone,
        req.body.photoURL,
      ];
      console.log(values);
      db.query(q, [values], (err, data) => {
        if (err) {
          return res.json({ err });
        }
        //using jwt
        const token = jwt.sign(
          { id: Math.round(Math.random() * 10000) },
          process.env.JWT_SECRET
        );
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("access_token", token, {
            httpOnly: true,
            secure: false, // prod make it true https secure
            maxAge: 60 * 60 * 12, //12hrs
            sameSite: "strict",
            path: "/", //everywhere
          })
        );
        console.log(token);
        //Set-Cookie is the name of the header
        return res.status(200).json("user has been created");
      });
    });
    db.close();
  });
}
