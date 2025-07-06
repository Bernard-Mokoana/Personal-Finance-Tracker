import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

export const user = mongoose.model("user", userSchema);
