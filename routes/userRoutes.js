const express = require('express');
const userController = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authMiddleware');
const router = express.Router();

// User routes
router.get("/",authenticateUser, userController.getAllUsers);
router.get('/:id',authenticateUser, userController.getUserById); // Get user by ID
router.put('/:id',authenticateUser, userController.updateUser); // Update user by ID
router.delete('/:id',authenticateUser, userController.deleteUser); // Delete user by ID

module.exports = router;
