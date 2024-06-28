const express = require('express');
const { addOrder, getAllOrders, deleteProductById, changeStatusById, getAllOrdersByCustomerId } = require('./OrderController');
const { verifyToken } = require('../middleware/verifytoken');
const router = express.Router();

router.use(verifyToken);
router.post("/add", addOrder)
router.get("/getall/:userId", getAllOrders);
router.post("/removeproduct/:id", deleteProductById);
router.post("/changestatus/:id", changeStatusById);
router.get("/getallbycustomerid/:customerId",getAllOrdersByCustomerId)

module.exports = router