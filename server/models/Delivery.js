import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    default: "Point"
  },
  coordinates: {
    type: [Number],
    required: true
  },
  address: String
});

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
      name: String,
      phone: String
    },

    droneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drone",
      default: null
    },

    weightRange: {
      type: String,
      enum: ["0-5", "5-10", "10-20"],
      required: true
    },

    price: Number,

    deliveryType: {
      type: String,
      enum: ["REGULAR", "FAST"],
      default: "REGULAR"
    },

    pickupLocation: locationSchema,

    deliveryLocation: locationSchema,

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

deliverySchema.index({ pickupLocation: "2dsphere" });
deliverySchema.index({ deliveryLocation: "2dsphere" });

export const Delivery = mongoose.model("Delivery", deliverySchema);