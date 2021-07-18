import express from "express";
import authorized from "../middlewares/authorized";
import { Product, IProduct } from "../models/product";

const product = new Product();

const create = async (req: express.Request, res: express.Response) => {
  const result = await product.create(req.body);
  res.json(result);
};

const index = async (req: express.Request, res: express.Response) => {
  const result = await product.index();
  res.json(result);
};

const show = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  const result = await product.show(Number(id));
  res.json(result);
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", authorized, create);
};

export default productRoutes;
