const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  location: {
    address: { type: String, required: true },
    coordinates: { type: [Number], index: "2dsphere" },
  },
  cuisineType: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  contact: {
    phone: { type: String },
    email: { type: String },
    socialMedia: { type: [String] },
  },
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }], // Reference to the Meal model
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
