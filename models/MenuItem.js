const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, enum: ['Snack', 'Meal', 'Beverage', 'Dessert'] },
    isAvailable: { type: Boolean, default: true }
});
module.exports = mongoose.model('MenuItem', menuSchema);