import Client from "../database";
import { PoolClient } from "pg";

export type IProduct = {
  id?: Number;
  name: string;
  price: string;
  category: string;
};

export class Product {
  async create(data: IProduct): Promise<IProduct> {
    try {
      const { name, price, category } = data;
      const conn = await Client.connect();
      const sql =
        "INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [name, price, category]);
      conn.release();
      const product = result.rows[0];
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async index(): Promise<IProduct[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(error);
    }
  }

  async show(id: number): Promise<IProduct> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE id = $1;";
      const result = await conn.query(sql, [id]);
      conn.release();
      const product = result.rows[0];
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTopFiveProducts(): Promise<IProduct[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql =
        "SELECT * FROM products WHERE id IN (SELECT pp.product_id FROM (SELECT product_id, Count(*) FROM orders GROUP BY product_id LIMIT 5) AS pp);";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(error);
    }
  }
}
