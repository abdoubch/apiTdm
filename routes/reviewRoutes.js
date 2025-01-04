const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

// Review routes
router.post('/', reviewController.createReview); // Create a review
router.get('/:restaurantId', reviewController.getReviewsByRestaurant); // Get reviews by restaurant ID
router.delete('/:id', reviewController.deleteReview); // Delete review by ID

module.exports = router;
