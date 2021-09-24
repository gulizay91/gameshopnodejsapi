const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    username: { type: String, required: true, unique: true, maxlength: 50 },
    password: String,
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    firstName: { type: String, maxlength: 50 },
    lastName: { type: String, maxlength: 50 },
    phoneNumber: { type: String, maxlength: 20 }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);