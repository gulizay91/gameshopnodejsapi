const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema =  mongoose.Schema({
    categoryId: {
        type: ObjectId,
        ref: 'category',
        required: true
    },
    title: { type: String, required: true },
    description: String,
    price: Number,
    rating: Number
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema);