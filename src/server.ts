import express, { Request, Response } from "express";

import productRoutes from "./handlers/product";
import userRoutes from "./handlers/user";
import orderRoutes from "./handlers/order";

const app: express.Application = express();

app.use(express.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

productRoutes(app);
userRoutes(app);
orderRoutes(app);

app.listen(3001, function () {
  console.log(`starting app on: 3001`);
});
