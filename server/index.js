import express, { json } from "express";

import mongoose, { connect } from "mongoose";

import SETTINGS from "./config.js";

import morgan from "morgan";
import userRouter from "./routes/UserRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";

export const server = express();

// Port number on which the Backend Server is running.
const PORT = 4000;

// Setup the host name to access the Express Server from different computer rather than localhost
const hostName = "10.0.0.1";

try {
    const db = connect(SETTINGS.MONGODB_URL);
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

server.listen(PORT, hostName, () => console.log("Express Server is started."))