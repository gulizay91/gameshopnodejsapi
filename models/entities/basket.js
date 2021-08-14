const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const basketItemSchema =  mongoose.Schema({
    productId: {
        type: ObjectId,
        ref: 'product',
        required: true
    },
    totalQty: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
}, { timestamps: true });

const basketSchema =  mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    items: [ basketItemSchema ],
    totalQty: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('basket', basketSchema);