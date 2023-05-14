import express from "express";
import cors from "cors";
import { api as ProductRoute } from "./routes/product.routes.js";

const port = 3000;
const app = express();

app.use(express.json());

app.use(cors());
app.use(`/api`, ProductRoute);

try {
  app.listen(port, () => {
   console.log("http://localhost:3000/")
    console.log(`Backend Starts ${port}🔥`);
  });
} catch (err) {
  console.log(err);
}
