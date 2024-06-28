const express = require('express');
const { addCustomer, getCustomers, getCustomer, login } = require('./CustomerController');
const { verifyToken } = require('../middleware/verifytoken');
const router = express.Router();
// router.use(verifyToken);
router.post('/add', verifyToken, addCustomer);
router.get('/getall/:userId', verifyToken, getCustomers);
router.get('/get/:id', verifyToken, getCustomer);
router.post('/login', login)
module.exports = router;