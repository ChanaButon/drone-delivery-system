import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    receiver: {
      name: { type: String, required: true },
      phone: String,
      address: String
    },

    droneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drone",
      default: null
    },

    weight: {
      type: Number,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    deliveryType: {
      type: String,
      enum: ["REGULAR", "FAST"],
      default: "REGULAR"
    },

    pickupLocation: {
      lat: Number,
      lng: Number,
      address: String
    },

    deliveryLocation: {
      lat: Number,
      lng: Number,
      address: String
    },

    status: {
      type: String,
      enum: ["CREATED", "ASSIGNED", "LOADING", "IN_FLIGHT", "DELIVERED", "FAILED"],
      default: "CREATED"
    },

    notes: String,
    assignedAt: Date,
    pickedUpAt: Date,
    deliveredAt: Date
  },
  { timestamps: true }
);

export const Delivery = mongoose.model("Delivery", deliverySchema);