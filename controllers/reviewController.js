const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
  const { user, restaurant, rating, comment } = req.body;
  try {
    const newReview = new Review({ user, restaurant, rating, comment });
    await newReview.save();
    res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create review', error });
  }
};

// Get reviews by restaurant ID
exports.getReviewsByRestaurant = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.restaurantId }).populate('user');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews', error });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete review', error });
  }
};
