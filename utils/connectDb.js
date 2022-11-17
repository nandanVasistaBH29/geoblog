import mysql from "mysql";
// connection to AWS RDS
export const pool = mysql.createPool({
  host: process.env.AWS_DATABASE_ENDPOINT,
  user: process.env.AWS_DATABASE_USER,
  port: process.env.AWS_DATABASE_PORT,
  password: process.env.AWS_DATABASE_PASSWORD,
  database: process.env.AWS_DATABASE_DATABASE,
});
