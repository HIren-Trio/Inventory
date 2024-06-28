const mongoose = require('mongoose');
const fields = require('./OrderSchema');

const OrderSchema = new mongoose.Schema(fields);
const Order = mongoose.model('Order', OrderSchema);

module.exports = { Order };