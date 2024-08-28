import { createOrder, getOrder, getOrders, updateOrder } from "../controllers/OrderController.js";

import { Router } from "express";
import authJwt from "../middlewares/authJwt.js";

const orderRouter = Router();

// Creation of order.
orderRouter.post("/createorder", authJwt, createOrder);

// Returing all orders.
orderRouter.get("/getorders/:userId/:userType", authJwt, getOrders);

// Returing specific order details.
orderRouter.get("/getorder/:userId/:orderId", authJwt, getOrder)

// Updating the existing order.
orderRouter.put("/updateorder", authJwt, updateOrder)

export default orderRouter;