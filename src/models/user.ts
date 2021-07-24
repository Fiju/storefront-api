import { PoolClient } from "pg";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Client from "../database";

export type IUser = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class User {
  async index(): Promise<IUser[]> {
    const con: PoolClient = await Client.connect();
    const sql: string = "SELECT * FROM users";
    const result = await con.query(sql);
    con.release();
    return result.rows;
  }

  async create(user: IUser): Promise<string> {
    const { firstname, lastname, password } = user;
    const hashed = await bcrypt.hash(
      password + process.env.BCRYPT_PASSWORD,
      Number(process.env.SALT_ROUNDS) as number
    );
    const con: PoolClient = await Client.connect();
    const sql: string =
      "INSERT INTO users(firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";
    const result = await con.query(sql, [firstname, lastname, hashed]);
    con.release();
    const usr = result.rows[0];
    const token = jwt.sign(usr, process.env.SECRET_TOKEN as string);
    return token;
  }

  async authenticate(user: IUser): Promise<string> {
    const { firstname, password } = user;
    const con: PoolClient = await Client.connect();
    const sql: string = "SELECT * FROM users WHERE firstname = $1";
    const result = await con.query(sql, [firstname]);
    const usr = result.rows[0];
    con.release();
    const isAuth = usr
      ? await bcrypt.compare(
          password + process.env.BCRYPT_PASSWORD,
          usr.password
        )
      : null;
    return isAuth ? jwt.sign(usr, process.env.SECRET_TOKEN as string) : "";
  }

  async getUserFromJWT(token: string): Promise<IUser> {
    const user: IUser = jwt.verify(
      token,
      process.env.SECRET_TOKEN as string
    ) as IUser;
    return user;
  }

  async show(id: string): Promise<IUser> {
    const con: PoolClient = await Client.connect();
    const sql: string = "SELECT * FROM users WHERE id = $1";
    const result = await con.query(sql, [id]);
    const usr = result.rows[0];
    con.release();
    return usr;
  }

  async remove(user: IUser): Promise<IUser> {
    const { id } = user;
    const con: PoolClient = await Client.connect();
    const sql: string = "DELETE FROM users WHERE id = $1 RETURNING *";
    const result = await con.query(sql, [id]);
    const usr = result.rows[0];
    con.release();
    return usr;
  }
}
