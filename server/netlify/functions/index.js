import express, { json } from 'express';
import mongoose, { connect } from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import serverless from 'serverless-http';
import SETTINGS from '../../config.js';
import userRouter from '../../routes/UserRoutes.js';
import cartRouter from '../../routes/cartRoutes.js';
import orderRouter from '../../routes/orderRoutes.js';
import payPalRouter from '../../routes/payPalRoutes.js';
import productRouter from '../../routes/productRoutes.js';

const app = express();

// Setup MongoDB connection
try {
    const db = connect(SETTINGS.MONGODB_URL);
    if (db) {
        const { connection } = mongoose;
        connection.on('connected', () => console.log('MongoDB is connected'));
    }
} catch (error) {
    console.log(error.message);
}

app.use(morgan('dev'));

// Parse incoming JSON requests
app.use(json());

// Serve static files from the 'public/images' directory
app.use('/uploads', express.static(path.join(__dirname, 'public/images')));

// Define routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/paypal', payPalRouter);

// Export the handler for serverless deployment
export const handler = serverless(app);