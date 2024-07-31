import express, { json } from "express";

import mongoose, { connect } from "mongoose";

import { config } from "dotenv";

import morgan from "morgan";
import userRouter from "./routes/UserRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import payPalRouter from "./routes/payPalRoutes.js";
import productRouter from "./routes/productRoutes.js";

config()

const { ATLAS_URL, PORT } = process.env;

export const server = express();

const hostNames = ["10.0.0.1", "192.168.0.105"];

try {
    const db = connect(ATLAS_URL);
    if (db) {
        const { connection } = mongoose;
        connection.on('connected', () => console.log('MongoDB is connected'));
    }
}
catch (error) {
    console.log(error.message)
}

server.use(morgan())

// Parsing the body sent over requests.
server.use(json())

server.use('/uploads', express.static('public/images'))

// Connecting the userRoutes to Express Application
server.use('/api', userRouter);

// Connecting the productRoutes to Express Application
server.use('/api', productRouter);

// Connecting the carttRoutes to Express Application
server.use('/api', cartRouter);

// Connecting the carttRoutes to Express Application
server.use('/api', orderRouter);

// Connecting the payPalRouter to Express Application
server.use('/api', payPalRouter);

// server.listen(PORT, hostName, () => console.log("Express Server is started."))

hostNames.forEach(hostname => {
    server.listen(PORT, hostname, () => {
        console.log(`Express Server is started on ${hostname}:${PORT}`);
    });
});