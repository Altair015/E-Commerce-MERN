import express, { json } from "express";

import mongoose, { connect } from "mongoose";

import { config } from "dotenv";

import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import payPalRouter from "./routes/payPalRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

config()

const { MONGODB_URL, PORT, HOST_NAME } = process.env;

const server = express();

try {
    const db = connect(MONGODB_URL);
    if (db) {
        const { connection } = mongoose;
        connection.on('connected', () => console.log('MongoDB Server is connected'));
    }
}
catch (error) {
    console.log(error.message)
}

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

server.listen(PORT, HOST_NAME, () => console.log(`Express Server is started on ${HOST_NAME}:${PORT}`));