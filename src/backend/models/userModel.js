const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    index: true,
    unique: false,
  },
  password: { type: String, required: true},
  isAdmin: { type: Boolean, required: true, default: false}
});

const User = mongoose.model('User', userSchema);
module.exports = User;