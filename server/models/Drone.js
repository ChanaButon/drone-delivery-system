import mongoose from "mongoose";

const droneSchema = new mongoose.Schema({
  droneCode: String,
  status: {
    type: String,
    enum: ["available", "delivering", "charging", "InMaintenance"],
    default: "available"
  },
  batteryLevel: Number,
  baseStationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BaseStation"
  },
  lastMaintenance: Date
});

export const Drone = mongoose.model("Drone", droneSchema);
