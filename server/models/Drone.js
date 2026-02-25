import mongoose from "mongoose";

const droneSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["available", "delivering", "charging", "InMaintenance"],
    default: "available"
  },

  batteryLevel: {
    type: Number,
    default: 100
  },

  baseStationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BaseStation"
  },

  lastMaintenance: Date,

  createdDate: {
    type: Date,
    default: () => {
      const today = new Date();
      return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }
  }
});

export const Drone = mongoose.model("Drone", droneSchema);