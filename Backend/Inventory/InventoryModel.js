const mongoose = require('mongoose');
const fields  = require('./InventorySchema');

const inventorySchema = new mongoose.Schema(fields);
const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = { Inventory  };