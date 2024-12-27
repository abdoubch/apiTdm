const Meal = require("../models/meal");

// Obtenir tous les repas pour un restaurant
exports.getMealsByRestaurant = async (req, res) => {
  try {
    const meals = await Meal.find({ restaurant: req.params.restaurantId });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des repas" });
  }
};

// Créer un nouveau repas pour un restaurant
exports.createMeal = async (req, res) => {
  try {
    const meal = new Meal({
      ...req.body,
      restaurant: req.params.restaurantId,
    });
    await meal.save();
    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la création du repas" });
  }
};

// Mettre à jour un repas
exports.updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.mealId, req.body, {
      new: true,
    });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du repas" });
  }
};

// Supprimer un repas
exports.deleteMeal = async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.mealId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression du repas" });
  }
};
