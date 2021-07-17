import Client from "../database";

export type IProduct = {
  id: Number;
  name: string;
  price: Number;
  category: string;
};

export class Product {
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
}
