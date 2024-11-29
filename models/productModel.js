const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    discount: {type: Number, default: 0},
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
}, {timestamps: true});
module.exports = mongoose.model('product', productSchema);