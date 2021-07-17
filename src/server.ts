import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import productRoutes from "./handlers/product";

const app: express.Application = express();

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

productRoutes(app);

app.listen(3001, function () {
  console.log(`starting app on: 3001`);
});
