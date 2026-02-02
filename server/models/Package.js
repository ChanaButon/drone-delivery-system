import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    pickupLocation: {
      lat: Number,
      lng: Number
    },
    deliveryLocation: {
      lat: Number,
      lng: Number
    },
    weight: {
      type: Number,
      required: true,
      min: 0.1
    },
    status: {
      type: String,
      enum: [
        "CREATED",
        "ASSIGNED",
        "IN_TRANSIT",
        "DELIVERED",
        "FAILED"
      ],
      default: "CREATED"
    },
    droneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drone"
    },
    stationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BaseStation"
    }
  },
  { timestamps: true }
);

export const Package = mongoose.model("Package", packageSchema);
