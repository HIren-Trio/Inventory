const Notification = require("./NotificationModal");

const createNotification = async (message, userId, userType) => {
    const notification = new Notification({
        message,
        userType,
        user: userId,
    });
    await notification.save();
};

const getNotificationById = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed as a parameter in the request
    try {
        const notification = await Notification.find({ user: id });
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createNotification,
    getNotificationById
};
