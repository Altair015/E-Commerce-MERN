import { Router } from "express";
import { getPayPalId } from "../controllers/PayPalController.js";
import authJwt from "../middlewares/authJwt.js"

const payPalRouter = Router();

payPalRouter.get("/getpaypalid", authJwt, getPayPalId)

export default payPalRouter;