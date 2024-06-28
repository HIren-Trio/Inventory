const mongoose = require('mongoose');
const fields  = require('./CustomerSchema');

const customerSchema = new mongoose.Schema(fields);
const Customer = mongoose.model('Customer', customerSchema);

module.exports = { Customer  };