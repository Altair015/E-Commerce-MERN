import { Router } from "express";
import { createCart, deleteCart, getCart, updateCart, updatingCart } from "../controllers/CartController.js";

import authJwt from "../middlewares/authJwt.js";

const cartRouter = Router();

cartRouter.post("/createcart", authJwt, createCart);
cartRouter.get("/getcart/:userId", authJwt, getCart);
cartRouter.put("/updatecart", authJwt, updateCart);
cartRouter.delete("/deletecart", authJwt, deleteCart);
cartRouter.put("/updatingcart", authJwt, updatingCart)

export default cartRouter;