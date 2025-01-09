const Meal = require("../models/meal");



exports.getFiveRandomMeals = async (req, res) => {
  try {
    const meals = await Meal.aggregate([{ $sample: { size: 5 } }]);
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des repas" });
  }
};


exports.getMealById = async (req, res) => {
  try {
    const { mealId } = req.params;
    const meal = await Meal.findById(mealId); // Utilisation de Mongoose
    if (!meal) {
      return res.status(404).json({ message: "Repas non trouvé" });
    }
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


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
  const {name,description,details,logo,price} =  req.body
  try {
    const meal = new Meal({
      name,
      description,
      details,
      logo,
      price,
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

// Get Meal By ID 
exports.getMealById = async (req, res) => {
  try {
      const meal = await Meal.findById(req.params.mealId)
      if (!meal) {
        return res.status(404).json({ success: false, message: 'Meal not found' });
      }
      res.status(200).json(meal);
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch meal', error });
    }
};
