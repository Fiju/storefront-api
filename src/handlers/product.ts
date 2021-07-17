import express from "express";
import { Product, IProduct } from "../models/product";

const product = new Product();

const index = async (req: express.Request, res: express.Response) => {
  const result = await product.index();
  res.json(result);
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
};

export default productRoutes;
