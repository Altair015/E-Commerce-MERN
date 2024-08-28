import { config } from "dotenv";

config()

const { PAYPAL_CLIENT_ID } = process.env;

export function getPayPalId(req, res) {
    // Returing paypal client id.
    return res.status(201).json({ payPalClientId: PAYPAL_CLIENT_ID })
}