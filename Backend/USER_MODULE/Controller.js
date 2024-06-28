const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { registerSchema, loginSchema } = require('./ValidationSchema');
const { User } = require('./Model');
const {createNotification} = require('../Notification/NotificationService');
dotenv.config();
const secret = process.env.JWT_SECRET_KEY;



exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const { error } = registerSchema.validate({ username, email, password });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (req.file) {
            await storeSingleImage(req, res, async (err) => {
                if (err) {
                    return res.status(400).json({ message: err.message });
                }
                let image = req.file.filename;
                user = await User.create({ username, email, password: hashedPassword, profilePic: image });
                await createNotification(`User ${username} registered with image`, user._id, 'User');
                res.status(201).json({ message: "User Registered successfully" });
            });
        } else {
            user = await User.create({ username, email, password: hashedPassword });
            await createNotification(`User ${username} registered`, user._id, 'User');
            res.status(201).json({ message: "User Registered successfully" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { error } = loginSchema.validate({ email, password });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email " });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, secret, { expiresIn: '1h' });
   
        res.status(200).json({ message: "Login Successfully", token, id: user._id, username: user.username, email: user.email });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        let user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        await User.findByIdAndDelete(id);
        await createNotification(`User ${user.username} deleted`, user._id, 'User');
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
