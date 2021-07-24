import { PoolClient } from "pg";
import Client from "../database";
import { IUser } from "./user";

export type IOrder = {
  id?: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status?: number;
};

export class Order {
  async create(data: IOrder): Promise<IOrder> {
    try {
      const { product_id, quantity, user_id } = data;
      const conn: PoolClient = await Client.connect();
      const sql =
        "INSERT INTO orders(product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *";
      const result = await conn.query(sql, [product_id, quantity, user_id, 0]);
      conn.release();
      const product = result.rows[0];
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserOrders(id: string): Promise<IOrder[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql = "SELECT * FROM orders WHERE user_id = $1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCompletedUserOrders(user: IUser): Promise<IOrder[]> {
    try {
      const { id } = user;
      const conn: PoolClient = await Client.connect();
      const sql = "SELECT * FROM orders WHERE user_id = $1 AND status = '1'";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(error);
    }
  }
}
