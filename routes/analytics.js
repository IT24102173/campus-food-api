const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const mongoose = require('mongoose');

// 7.1 Total Spent
router.get('/total-spent/:studentId', async (req, res) => {
    try {
        const total = await Order.aggregate([
            { $match: { student: new mongoose.Types.ObjectId(req.params.studentId) } },
            { $group: { _id: "$student", totalSpent: { $sum: "$totalPrice" } } }
        ]);
        res.json(total);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 7.2 Top Selling Items
router.get('/top-menu-items', async (req, res) => {
    try {
        const topItems = await Order.aggregate([
            { $unwind: "$items" },
            { $group: { _id: "$items", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
            { $lookup: { from: "menuitems", localField: "_id", foreignField: "_id", as: "details" } }
        ]);
        res.json(topItems);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 7.3 Daily Orders
router.get('/daily-orders', async (req, res) => {
    try {
        const daily = await Order.aggregate([
            { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(daily);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;