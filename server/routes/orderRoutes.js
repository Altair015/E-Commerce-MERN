import { createOrder, getOrder, getOrders, insertOrder, updateOrder } from "../controllers/OrderController.js";

import { Router } from "express";

const orderRouter = Router();

orderRouter.post("/createorder", createOrder);
orderRouter.put("/insertorder", insertOrder);
orderRouter.get("/getorders/:userId/:userType", getOrders);
orderRouter.get("/getorder/:userId/:orderId", getOrder)
orderRouter.put("/updateorder", updateOrder)

export default orderRouter;