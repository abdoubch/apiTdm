const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Routes pour le panier
router.get("/", cartController.getCart);
router.post("/add", cartController.addToCart);
router.delete("/remove/:mealId", cartController.removeFromCart);
router.post("/checkout", cartController.checkout);

module.exports = router;
