import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema({
  User: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  category: {
    type: Array[String],
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: Date,
  Timestamp,
});
