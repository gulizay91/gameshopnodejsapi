const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: String,
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    firstName: String,
    lastName: String
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);