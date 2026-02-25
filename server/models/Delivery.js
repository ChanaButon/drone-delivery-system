import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
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

    stationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BaseStation",
      required: true
    },

    weight: {
      type: Number,
      required: true
    },

    dimensions: {
      length: Number,
      width: Number,
      height: Number
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
      enum: [
        "CREATED",
        "ASSIGNED",
        "LOADING",
        "IN_FLIGHT",
        "DELIVERED",
        "FAILED"
      ],
      default: "CREATED"
    },

    price: Number,

    notes: String,

    assignedAt: Date,
    pickedUpAt: Date,
    deliveredAt: Date
  },
  {
    timestamps: true
  }
);

export const Delivery = mongoose.model("Delivery", deliverySchema);
