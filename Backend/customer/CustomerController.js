const { Customer } = require("./CustomerModel");
const { customerValidationSchema, loginSchema } = require("./customerValidationSchema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { createNotification } = require("../Notification/NotificationService");

dotenv.config();
const secret = process.env.JWT_SECRET_KEY;



exports.addCustomer = async (req, res) => {
    const {
        userId,
        firstname,
        lastname,
        email,
        password,
    } = req.body;
    try {
        const { error } = customerValidationSchema.validate({
            userId,
            firstname,
            lastname,
            email,
            password,
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        let customer = await Customer.findOne({ email });
        if (customer) {
            return res.status(400).json({ message: "Customer already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        customer = new Customer({
            userId,
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });
        await customer.save();
        await createNotification(`Customer ${firstname} ${lastname} added`, customer._id, 'Customer');
        res.status(200).json({ message: "Customer added successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const { userId } = req.params;
        const customers = await Customer.find({ userId }, '_id firstname lastname email');
        res.status(200).json(customers);
        await createNotification(`Fetched customers for user ${userId}`, userId, 'User');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getCustomer = async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
        await createNotification(`Fetched customer ${id}`, customer.userId, 'User');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const id = req.params.id;
        Customer.findByIdAndRemove(id, async (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal Server Error" });
            }
            if (!doc) {
                return res.status(404).json({ message: "Customer not found" });
            }
            await createNotification(`Customer ${id} deleted`, doc.userId, 'User');
            res.status(200).json({ message: "Customer deleted successfully" });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { error } = loginSchema.validate({ email, password });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        let user = await Customer.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email " });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email, userId: user.userId }, secret, { expiresIn: '1h' });
        await createNotification(`Customer ${user.firstname} ${user.lastname} logged in`, user._id, 'Customer');

        res.status(200).json({ message: "Login Successfully", token, id: user._id, username: `${user.firstname} ${user.lastname}`, email: user.email, userId: user.userId });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
