const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// POST /api/cart
// Create or update a cart for a specific user
router.post('/', async (req, res) => {
  const { email, items } = req.body;

  try {
    // Check if a cart already exists for the user
    let cart = await Cart.findOne({ email });

    if (cart) {
      // If exists, update the items
      cart.items = items;
      await cart.save();
    } else {
      // If not exists, create a new cart
      cart = new Cart({ email, items });
      await cart.save();
    }

    res.status(200).json({ message: 'Cart saved', cart });
  } catch (err) {
    console.error('Error saving cart:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/cart/:email
// Get the cart for a specific user by email
router.get('/:email', async (req, res) => {
  try {
    const cart = await Cart.findOne({ email: req.params.email });

    if (!cart) {
      // If no cart found, return 404
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Return the cart
    res.json(cart);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
