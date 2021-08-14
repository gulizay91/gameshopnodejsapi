const mongoose = require('mongoose');

const categorySchema =  mongoose.Schema({
    name: { type: String, required: true, unique: true, maxlength: 100 },
    description: { type: String, maxlength: 500 }
}, { timestamps: true });

module.exports = mongoose.model('category', categorySchema);