import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    stationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BaseStation"
    },

    droneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drone"
    },

    status: {
      type: String,
      enum: ["created", "assigning", "in_transit", "completed", "cancelled"],
      default: "created"
    },

    completedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
