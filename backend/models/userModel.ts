import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    index: true,
    unique: false,
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

export const User = mongoose.model("User", userSchema);
