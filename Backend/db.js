import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER, // Use 'user' instead of 'username'
  password: process.env.DB_PASSWORD,
});

export default sql;
