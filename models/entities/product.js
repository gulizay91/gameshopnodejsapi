const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema =  mongoose.Schema({
    categoryId: {
        type: ObjectId,
        ref: 'category',
        required: true
    },
    title: { type: String, required: true, unique: true },
    description: { type: String, maxlength: 1000 },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    imageLogo: { type: String },
    image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema);