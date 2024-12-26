const User = require('../models/User');

// Create a new user


exports.createUser = async (req, res) => {
    const { name, email, phone, address, password, profilePicture, googleId } = req.body;
    try {
      const newUser = new User({ name, email, phone, address, password, profilePicture, googleId });
      await newUser.save();
      res.status(201).json({ success: true, user: newUser });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to create user', error });
    }
  };
  
  // Get a user by ID
  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch user', error });
    }
  };
  
  // Update user info
  exports.updateUser = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update user', error });
    }
  };
  
  // Delete user
  exports.deleteUser = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete user', error });
    }
  };