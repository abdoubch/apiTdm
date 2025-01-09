const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticateUser } = require("../middleware/authMiddleware");

// Routes pour le panier
router.get("/", cartController.getCart);
router.post("/add/:cartId", cartController.addToCart);
router.delete("/remove/:cartId/:mealId", cartController.removeFromCart);
router.post("/checkout",cartController.checkout);
router.get("/user/:id", cartController.getCartByUserId);
router.delete("/:id",cartController.deleteCart);
router.post('/', cartController.createCart);
router.put('/updateQuantity/:cartId/:mealId/:quantity', cartController.updateCartItemQuantity);
router.get("/carts", cartController.getAllCart); 



module.exports = router;
