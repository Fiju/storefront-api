import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { DATABASE_HOST, DATABASE_DB, DATABASE_USER, DATABASE_PASSWORD } =
  process.env;

const client = new Pool({
  host: DATABASE_HOST,
  database: DATABASE_DB,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
});

export default client;
