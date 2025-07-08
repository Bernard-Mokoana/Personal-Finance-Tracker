import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
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
    username: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const users = mongoose.model("users", userSchema);
