const express = require('express');
const router = express.Router();
const { addInventory, deleteInventory, getInventories, getInventory, searchInventory, updateInventory } = require('./InventoryController');
const { verifyToken } = require('../middleware/verifytoken');

router.use(verifyToken);
router.post('/add', addInventory);
router.delete('/delete/:id', deleteInventory);
router.get('/getAll/:userId', getInventories);
router.get('/getOne/:id', getInventory);
router.get('/search/:query', searchInventory);
router.post('/update/:id', updateInventory);



module.exports = router;