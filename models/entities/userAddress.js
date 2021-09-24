const mongoose = require('mongoose');

const userAddressSchema =  mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    title: String,
    building: { type: String, maxlength: 100 },
    street: { type: String, maxlength: 250 },
    country: { type: String, maxlength: 250 },
    city: { type: String, maxlength: 250 }
}, { timestamps: true });

module.exports = mongoose.model('useraddress', userAddressSchema);