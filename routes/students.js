const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;