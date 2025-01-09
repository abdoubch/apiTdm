const Cart = require('../models/cart');
const Order = require('../models/Order');
const Meal = require('../models/meal');


// Obtenir le panier d'un utilisateur
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.meal');
        if (!cart) {
            return res.status(404).json({ error: 'Panier non trouvé' });
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération du panier' });
    }
};

// Create card 
exports.createCart = async (req, res) => {
  const { user, items, totalPrice, deliveryPrice } = req.body;
  try {
    const existingCart = await Cart.findOne({ user: user});
    if (existingCart) {
            return res.status(400).json({ error: 'Vous avez déjà un panier' });
    }

    const newCart = new Cart({ user, items, totalPrice, deliveryPrice });

    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create cart', error });
  }
};


// Ajouter un article au panier
exports.addToCart = async (req, res) => {
    try {
        const { cartId } = req.params; 
        const { meal, quantity } = req.body; 

        const cart = await Cart.findById(cartId);

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const existingItem = cart.items.find(item => item.meal.toString() === meal);
        const mealadded = await Meal.findById(meal)

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ meal: meal, quantity: quantity });
        }
        cart.totalPrice = cart.totalPrice + mealadded.price * quantity;

        await cart.save();
        
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Error while adding item to cart' });
    }
};

// Supprimer un article du panier
exports.removeFromCart = async (req, res) => {
    try {
        const { cartId, mealId } = req.params; 
        const cart = await Cart.findById(cartId); // Find the cart by cartId

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const mealremoved= await Meal.findById(mealId)
        const existingItem = cart.items.find(item => item.meal.toString() === mealId);

        // Remove the item from the cart by filtering out the mealId
        cart.items = cart.items.filter(item => item.meal.toString() !== mealId);
        cart.totalPrice = cart.totalPrice - existingItem.quantity * mealremoved.price;

        if (cart.items.length === 0) {
            await Cart.findByIdAndDelete(cartId);
            return res.status(200).json({ message: 'Cart is empty and has been deleted' });
          }

        // Save the updated cart
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Error while removing item from cart' });
    }
};


// Valider le panier et créer une commande
exports.checkout = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.meal');
        if (!cart) {
            return res.status(404).json({ error: 'Panier non trouvé' });
        }

        const order = new Order({
            customerName: req.user.name,
            address: req.body.address,
            items: cart.items.map(item => ({
                name: item.meal.name,
                price: item.meal.price,
                quantity: item.quantity,
            })),
            total: cart.items.reduce((acc, item) => acc + item.meal.price * item.quantity, 0),
        });

        await order.save();
        await Cart.findByIdAndDelete(cart.id);

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la validation du panier' });
    }
};


//Delete cart 
exports.deleteCart = async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        if (!deletedCart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
          }
          res.status(200).json({ success: true, message: 'Cart deleted successfully' }); 
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete Cart' });
    }
};


//get user by cart
exports.getCartByUserId = async (req, res) => {
    try {
        const { UserId } = req.params; 

        const cart = await Cart.findOne({ User: UserId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found for the user' });
        }

        res.json(cart); 
    } catch (err) {
        res.status(500).json({ error: 'Error while fetching the cart' });
    }
};

// Update quantity of an item in the cart
exports.updateCartItemQuantity = async (req, res) => {
    try {
        const { cartId, mealId, quantity } = req.params;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Panier non trouvé' });
        }
        const mealupdated= await Meal.findById(mealId)

        const item = cart.items.find(item => item.meal.toString() === mealId);
        if (!item) {
            return res.status(404).json({ error: 'Article non trouvé dans le panier' });
        }

        cart.totalPrice = cart.totalPrice - item.quantity * mealupdated.price;
        item.quantity = quantity;
        cart.totalPrice = cart.totalPrice + item.quantity * mealupdated.price;

        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la quantité' });
    }
};

// Get all carts
exports.getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find(); 
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch carts', error });
  }
};

