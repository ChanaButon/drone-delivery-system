import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true
    },

    stationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Station"
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

    completedAt: Date
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
