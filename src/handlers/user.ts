import express from "express";
import { User, IUser } from "../models/user";
import authorized from "../middlewares/authorized";

const user = new User();

const index = async (_req: express.Request, res: express.Response) => {
  const result: IUser[] = await user.index();
  res.json(result);
};

const create = async (req: express.Request, res: express.Response) => {
  const result: string = await user.create(req.body);
  res.json(result);
};

const authenticate = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const result: string = await user.authenticate(req.body);
  if (result === "") {
    res.json("Invalid Crdentials provided");
    return;
  }
  res.json(result);
};

const remove = async (
  _req: express.Request,
  res: express.Response
): Promise<void> => {
  const result: IUser = await user.remove(res.locals.user);
  res.json(result);
};

const show = async (
  _req: express.Request,
  res: express.Response
): Promise<void> => {
  const result: IUser = await user.show(res.locals.user);
  res.json(result);
};

const userRoutes = (app: express.Application) => {
  app.post("/users", create);
  app.post("/users/authenticate", authenticate);
  app.get("/users", authorized, index);
  app.delete("/users", authorized, remove);
  app.get("/users", authorized, show);
};

export default userRoutes;
