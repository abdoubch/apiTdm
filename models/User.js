const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    googleId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
