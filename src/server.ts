import express from "express";

import productRoutes from "./handlers/product";
import userRoutes from "./handlers/user";
import orderRoutes from "./handlers/order";

const PORT: number = 3001;
const app: express.Application = express();

app.use(express.json());

productRoutes(app);
userRoutes(app);
orderRoutes(app);

app.listen(PORT, (): void => {
  console.log(`starting app on: ${PORT}`);
});
