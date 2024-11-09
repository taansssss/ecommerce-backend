const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.post('/addproduct', async (req, res) => {
    const { name, description, price, category } = req.body;
    if (!name || !price || price <= 0) return res.status(400).json({ error: 'Invalid product data.' });
    const product = new Product({ name, description, price, category });
    await product.save();
    res.json({ message: 'Product added successfully', productId: product._id });
});

// Similarly, implement the other endpoints: updateproduct, deleteproduct, and get all products

module.exports = router;
