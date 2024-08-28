import { Router } from "express";
import { getPayPalId } from "../controllers/PayPalController.js";
import authJwt from "../middlewares/authJwt.js"

const payPalRouter = Router();

// Returing the client id from .env file.
payPalRouter.get("/getpaypalid", authJwt, getPayPalId)

export default payPalRouter;