import { Router } from "express";
import { createCart, deleteCart, getCart, updateCart, updatingCart } from "../controllers/CartController.js";

import authJwt from "../middlewares/authJwt.js";

const cartRouter = Router();

// Adding first product in the cart.
cartRouter.post("/createcart", authJwt, createCart);

// Returing the products in the cart for specific user.
cartRouter.get("/getcart/:userId", authJwt, getCart);

// Inserting products in the existing cart.
cartRouter.put("/updatecart", authJwt, updateCart);

// Removing/Deleting the products/cart.
cartRouter.delete("/deletecart", authJwt, deleteCart);

// Adding the products in the non-logged in cart of user to the logged in cart of the user.
cartRouter.put("/updatingcart", authJwt, updatingCart)

export default cartRouter;