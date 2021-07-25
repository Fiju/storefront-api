import { PoolClient } from "pg";
import format from "pg-format";
import Client from "../database";
import { IUser } from "./user";

export type IOrder = {
  id?: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status?: number;
};

type IProductOrder = {
  id: number;
  quantity: number;
};

export type IProductOrderData = {
  products: IProductOrder[];
  user_id: number;
};

export class Order {
  async create(data: IProductOrderData): Promise<IOrder[]> {
    try {
      const { products, user_id } = data;
      const conn: PoolClient = await Client.connect();
      const sql =
        "INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING *";
      const result = await conn.query(sql, [user_id, 0]);
      const order = result.rows[0];
      const products_query = products.map((product) => [
        order.id,
        product.id,
        product.quantity,
      ]);
      const result_2 = await conn.query(
        format(
          "INSERT INTO products_order(order_id, product_id, quantity) VALUES %L RETURNING *",
          products_query
        )
      );
      conn.release();
      return result_2.rows;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getUserOrders(id: string): Promise<IOrder[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql =
        "SELECT orders.*, array_agg(row_to_json(po)) as products FROM orders JOIN products_order po ON orders.id = po.order_id WHERE user_id = $1 GROUP BY orders.id";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getCompletedUserOrders(user: IUser): Promise<IOrder[]> {
    try {
      const { id } = user;
      const conn: PoolClient = await Client.connect();
      const sql =
        "SELECT orders.*, array_agg(row_to_json(po)) as products FROM orders JOIN products_order po ON orders.id = po.order_id WHERE user_id = $1 AND status = '1' GROUP BY orders.id";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
