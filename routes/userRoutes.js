const express = require('express');
const userController = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authMiddleware');
const router = express.Router();

// User routes
router.get("/", userController.getAllUsers);
router.get('/:id', userController.getUserById); // Get user by ID
router.patch('/:id', userController.updateUser); // Update user by ID
router.delete('/:id', userController.deleteUser); // Delete user by ID

module.exports = router;
