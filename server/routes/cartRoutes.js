import { Router } from "express";
import { createCart, deleteCart, getCart, updateCart, updatingCart } from "../controllers/CartController.js";

// import authJwt from "../middlewares/authJwt.js";

const cartRouter = Router();

cartRouter.post("/createcart", createCart);
cartRouter.get("/getcart/:userId", getCart);
cartRouter.put("/updatecart", updateCart);
cartRouter.delete("/deletecart", deleteCart);
cartRouter.put("/updatingcart", updatingCart)

export default cartRouter;