import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      default: "no data"
    },

    address: String,

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer"
    },

    refreshToken: {
      type: String
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);