const express = require("express");
const router = express.Router();
const mealController = require("../controllers/mealController");

// Routes pour les repas
router.get("/:restaurantId/meals", mealController.getMealsByRestaurant);
router.post("/:restaurantId/meals", mealController.createMeal);
router.put("/meals/:mealId", mealController.updateMeal);
router.delete("/meals/:mealId", mealController.deleteMeal);

module.exports = router;
