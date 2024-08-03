import { createOrder, getOrder, getOrders, insertOrder, updateOrder } from "../controllers/OrderController.js";

import { Router } from "express";
import authJwt from "../middlewares/authJwt.js";



const orderRouter = Router();

orderRouter.post("/createorder", authJwt, createOrder);
orderRouter.put("/insertorder", authJwt, insertOrder);
orderRouter.get("/getorders/:userId/:userType", authJwt, getOrders);
orderRouter.get("/getorder/:userId/:orderId", authJwt, getOrder)
orderRouter.put("/updateorder", authJwt, updateOrder)

export default orderRouter;