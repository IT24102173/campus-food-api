const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['PLACED', 'PREPARING', 'READY', 'DELIVERED'], default: 'PLACED' },
    orderDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);