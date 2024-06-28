const {createNotification} = require("../Notification/NotificationService");
const { Customer } = require("../customer/CustomerModel");
const { Order } = require("./OrderModel");
const { addOrderValidationSchema } = require("./OrderValidationSchema");

exports.addOrder = async (req, res) => {
    try {
        const { products, customer } = req.body;
        const { error } = addOrderValidationSchema.validate({ products, customer });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const order = new Order({ products, customer });
        await order.save();
        await createNotification(`Order added for customer ${customer}`, customer, 'Customer');
        res.status(200).json({ message: "Order added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add order' });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch customers associated with the userId
        const customers = await Customer.find({ userId });
        const customerIds = customers.map(customer => customer._id);

        const orders = await Order.find({ customer: { $in: customerIds } })
            .populate({
                path: 'customer',
                select: '_id firstname lastname email'
            })
            .populate({
                path: 'products.product',
                select: '_id name category price stock'
            });

        const ordersWithTotal = orders.map(order => {
            const totalAmount = order.products.reduce((sum, item) => {
                return sum + (item.quantity * item.product.price);
            }, 0);

            return {
                ...order.toObject(),
                totalAmount
            };
        });

        res.status(200).json(ordersWithTotal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get orders' });
    }
};

exports.getAllOrdersByCustomerId = async (req, res) => {
    try {
        const { customerId } = req.params;
        const orders = await Order.find({ customer: customerId })
            .populate({
                path: 'customer',
                select: '_id firstname lastname email'
            })
            .populate({
                path: 'products.product',
                select: '_id name category price stock'
            });

        const ordersWithTotal = orders.map(order => {
            const totalAmount = order.products.reduce((sum, item) => {
                return sum + (item.quantity * item.product.price);
            }, 0);

            return {
                ...order.toObject(),
                totalAmount
            };
        });

        res.status(200).json(ordersWithTotal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get orders' });
    }
};

exports.deleteProductById = async (req, res) => {
    const { id } = req.params;
    const { productId } = req.body;

    try {
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const productIndex = order.products.findIndex(p => p._id.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in order' });
        }

        order.products.splice(productIndex, 1);

        if (order.products.length == 0) {
            await Order.findByIdAndDelete(id);
            await createNotification(`Order ${id} removed because it had no products`, order.customer, 'Customer');
            res.status(200).json({ message: "Product removed from order and order has no products, so order removed successfully" });
        } else {
            await order.save();
            await createNotification(`Product ${productId} removed from order ${id}`, order.customer, 'Customer');
            res.status(200).json({ message: 'Product removed from order successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete product from order' });
    }
};

exports.changeStatusById = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(id, {
            status: status
        }, { new: true });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await createNotification(`Order ${id} status changed to ${status}`, order.customer, 'Customer');
        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update order status' });
    }
};
