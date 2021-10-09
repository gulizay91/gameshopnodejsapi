const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const cartSchema =  mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    product: {
        type: ObjectId,
        ref: 'product',
        required: true
    },
    totalQty: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('cart', cartSchema);