const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const router = express.Router();

// Restaurant routes
router.get('/', restaurantController.getAllRestaurants); // Get all restaurants
router.post('/', restaurantController.createRestaurant); // Create a restaurant
router.get('/:id', restaurantController.getRestaurantById); // Get restaurant by ID
router.put('/:id', restaurantController.updateRestaurant); // Update restaurant by ID
router.delete('/:id', restaurantController.deleteRestaurant); // Delete restaurant by ID
module.exports = router;