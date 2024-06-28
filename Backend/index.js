const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./USER_MODULE/Router');
const inventoryRouter = require('./Inventory/InventoryRoutes');
const customerRouter = require('./customer/CustomerRoutes'); // Corrected variable name
const orderRouter = require('./orders/OrderRoutes'); // Corrected variable name
const notificationRouter = require('./Notification/NotificationRoutes'); // Corrected variable name

dotenv.config();
mongoose.set("strictQuery", false);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/customer', customerRouter);
app.use('/api/order', orderRouter);
app.use('/api/notification', notificationRouter);

// Connect to MongoDB and start server
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // mongoose connection options if any
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed: ', error);
    }
};

const port = process.env.PORT || 8000;
app.listen(port, () => {
    connect();
    console.log('Server is running on port ' + port);
});
