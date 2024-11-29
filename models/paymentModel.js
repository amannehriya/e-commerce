const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    order: {type: mongoose.Schema.Types.ObjectId, ref: 'order', required: true},
    status: {type: String, enum: ['pending', 'completed', 'failed'], default: 'pending'},
    amount: {type: Number, required: true},
    currency: {type: String, default: 'INR'},
    signature: {type: String, required: true},
}, {timestamps: true});

module.exports = mongoose.model('payment', paymentSchema);