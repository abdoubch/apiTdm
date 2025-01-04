const express = require("express");
const router = express.Router();
const mealController = require("../controllers/mealController");

// Routes pour les repas
router.get("/:restaurantId/meals", mealController.getMealsByRestaurant);
router.get("/:mealId", mealController.getMealById);
router.post("/:restaurantId/meals", mealController.createMeal);
router.put("/:mealId", mealController.updateMeal);
router.delete("/:mealId", mealController.deleteMeal);
router.get("/random/5", mealController.getFiveRandomMeals);

module.exports = router;
