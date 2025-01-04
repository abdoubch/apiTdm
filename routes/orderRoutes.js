const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

// Order routes
router.post("/", orderController.createOrder); // Create an order
router.get("/", orderController.getAllOrders); // Get an order by user ID
router.get("/user/:id", orderController.getOrdersByUserId); // Get an order by user ID
router.get('/:id', orderController.getOrderById); // Get order by ID
router.put('/:id/status', orderController.updateOrderStatus); // Update order status
router.delete('/:id', orderController.deleteOrder); // Delete order by ID

module.exports = router;
