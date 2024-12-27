const Cart = require('../models/cart');
const Order = require('../models/Order');

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

// Ajouter un article au panier
exports.addToCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }

        const { mealId, quantity } = req.body;
        const existingItem = cart.items.find(item => item.meal.toString() === mealId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ meal: mealId, quantity });
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de lajout au panier' });
    }
};

// Supprimer un article du panier
exports.removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ error: 'Panier non trouvé' });
        }

        cart.items = cart.items.filter(item => item.meal.toString() !== req.params.mealId);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression de larticle du panier' });
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
