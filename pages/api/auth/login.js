// /api/login
// POST

import { pool } from "../../../utils/connectDb";
import bcrypt from "bcryptjs"; // to hash password
import jwt from "jsonwebtoken"; // for auth
import cookie from "cookie"; // for secured auth

export default function handler(req, res) {
  const phoneOrEmail = req.body.phoneOrEmail;
  console.log(phoneOrEmail);
  let q;
  if (phoneOrEmail.includes("@")) {
    q = `select * from users where email = ?`;
  } else {
    q = `select * from users where phone = ?`;
  }
  pool.getConnection(function (err, db) {
    if (err) return res.json(err);
    db.query(q, [phoneOrEmail], (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ err });
      }
      const user_password = req.body.password;
      if (data.length === 0)
        return res
          .status(404)
          .json("Email hasn't register Please register first");
      // compare password
      if (user_password) {
        const isPasswordCorrect = bcrypt.compareSync(
          user_password,
          data[0].password
        ); // true;
        if (!isPasswordCorrect)
          return res.status(404).json("Either Password or email is wrong");
      }
      //using jwt
      const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);
      const { password, ...other } = data[0];
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
      //Set-Cookie is the name of the header
      res.status(200).json(other);
    });
  });
}
