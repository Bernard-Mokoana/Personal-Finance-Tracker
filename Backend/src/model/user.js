import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 8 characters long"],
  },
  Timestamp,
});

export const user = mongoose.model("user", userSchema);
