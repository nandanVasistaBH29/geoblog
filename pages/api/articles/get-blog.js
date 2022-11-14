import { db } from "../../../utils/connectDb";

export default function getParticular(req, res) {
  const id = req.query.id;
  const arr = [];
  let i = 0;
  db.connect(function (err) {
    if (err) throw err;
    // if connection is successful
    db.query("SELECT * FROM Posts ", function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw res.json({ error: err });
      // if there is no error, you have the result
      // iterate for all the rows in result
      Object.keys(result).forEach(function (key) {
        // console.log(result[key].body);
        arr[i++] = result[key].body;
        // console.log(arr[i - 1]);
      });
      console.log(arr[10]);
      // Object.keys(result).forEach(function (key) {
      //   var row = result[key];
      //   // console.log(row);
      // });
    });
  });
  console.log("====================================");
  console.log(arr);
  console.log("====================================");
  res.send("ada");
}
