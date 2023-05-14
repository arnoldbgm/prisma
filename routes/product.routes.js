import { Router } from "express";
import {
  createProduct,
  createdistrib,
  getDistrib,
  product,
  ventProd,
} from "../controllers/product.controller.js";

export const api = Router();

api.get("/producto", product);
api.post("/distribuidores", createdistrib);
api.get("/distribuidores", getDistrib);
api.post("/producto", createProduct);
api.post("/venta", ventProd);
