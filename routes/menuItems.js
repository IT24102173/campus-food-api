const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

router.post('/', async (req, res) => {
    try {
        const item = new MenuItem(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// 6.1 Search Endpoint
router.get('/search', async (req, res) => {
    try {
        const { name } = req.query;
        const items = await MenuItem.find({ name: { $regex: name, $options: 'i' } });
        res.json(items);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;