import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Client from "../database";

export type IUser = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class User {
  async index(): Promise<IUser[]> {
    const con = await Client.connect();
    const sql = "SELECT * FROM users";
    const result = await con.query(sql);
    con.release();
    return result.rows;
  }

  async create(user: any): Promise<string> {
    const { firstname, lastname, password } = user;
    const hashed = await bcrypt.hash(password + "abcd1234", 10);
    const con = await Client.connect();
    const sql =
      "INSERT INTO users(firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";
    const result = await con.query(sql, [firstname, lastname, hashed]);
    con.release();
    const usr = result.rows[0];
    const token = jwt.sign(usr, process.env.SECRET_TOKEN as string);
    return token;
  }

  async authenticate(user: any): Promise<string> {
    const { firstname, password } = user;
    const con = await Client.connect();
    const sql = "SELECT * FROM users WHERE firstname = $1";
    const result = await con.query(sql, [firstname]);
    const usr = result.rows[0];
    con.release();
    const isAuth = await bcrypt.compare(password + "abcd1234", usr.password);
    return isAuth ? jwt.sign(usr, process.env.SECRET_TOKEN as string) : "";
  }

  async show(user: IUser): Promise<IUser> {
    const { id } = user;
    const con = await Client.connect();
    const sql = "SELECT * FROM users WHERE id = $1";
    const result = await con.query(sql, [id]);
    const usr = result.rows[0];
    con.release();
    return usr;
  }

  async remove(user: IUser): Promise<IUser> {
    const { id } = user;
    const con = await Client.connect();
    const sql = "DELETE FROM users WHERE id = $1 RETURNING *";
    const result = await con.query(sql, [id]);
    const usr = result.rows[0];
    con.release();
    return usr;
  }
}
