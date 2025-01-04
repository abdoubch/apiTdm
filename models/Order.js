const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      notes: { type: String },
    },
  ],
  totalPrice: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  deliveryNotes: { type: String },
  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Picked_Up', 'On_the_Way', 'Delivered', 'Canceled'],
    default: 'Pending',
  },
  tracking: {
    driverLocation: {
      coordinates: { type: [Number], index: '2dsphere' }, // Latitude & Longitude
      updatedAt: { type: Date, default: Date.now },
    },
    driverContact: { type: String }, // Driver's phone
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
