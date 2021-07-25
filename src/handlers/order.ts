import express from "express";
import authorized from "../middlewares/authorized";
import { Order, IOrder, IProductOrderData } from "../models/order";

const order = new Order();

const create = async (req: express.Request, res: express.Response) => {
  const user = res.locals.user;
  const data: IProductOrderData = { user_id: user.id, ...req.body };
  const result: IOrder[] = await order.create(data);
  res.json(result);
};

const getUserOrders = async (req: express.Request, res: express.Response) => {
  const user = req.params.user_id;
  const result: IOrder[] = await order.getUserOrders(user);
  res.json(result);
};

const getCompletedUserOrders = async (
  _req: express.Request,
  res: express.Response
) => {
  const user = res.locals.user;
  const result: IOrder[] = await order.getCompletedUserOrders(user);
  res.json(result);
};

const orderRoutes = (app: express.Application) => {
  app.post("/orders", authorized, create);
  app.get("/orders/completed", authorized, getCompletedUserOrders);
  app.get("/orders/:user_id", authorized, getUserOrders);
};

export default orderRoutes;
