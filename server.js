const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const mealRoutes = require("./routes/mealRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const { authenticateUser } = require('./middleware/authMiddleware'); 
const cors = require('cors');
const morgan = require('morgan');

dotenv.config(); 

const app = express();


app.use(express.json()); 
app.use(cors());
app.use(morgan('dev')); 


mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error',(error)=>console.log(error))
db.once('open',()=>console.log("Connected to DB"))
app.use('/api/users', userRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api/restaurants', restaurantRoutes);

app.use('/api/reviews', reviewRoutes);

app.use("/api/meal", mealRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/auth", authRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
