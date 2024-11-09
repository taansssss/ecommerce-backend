const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, email, password, address } = req.body;
    try {
        if (await User.findOne({ email })) return res.status(400).json({ error: 'Email already registered.' });
        const user = new User({ name, email, password, address });
        await user.save();
        res.json({ message: 'Signup successful', userId: user._id });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) return res.status(400).json({ error: 'Invalid credentials.' });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Signin successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
