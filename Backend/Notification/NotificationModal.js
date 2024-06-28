const mongoose = require('mongoose');
const fields = require('./NotificationSchema');

const notificationSchema = new mongoose.Schema(fields);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
