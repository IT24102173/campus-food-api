const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// 6.2 Paginated Orders
router.get('/', async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    try {
        const orders = await Order.find()
            .populate('student items')
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const count = await Order.countDocuments();
        res.json({ orders, totalPages: Math.ceil(count / limit), currentPage: Number(page) });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;