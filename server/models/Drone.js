import mongoose from "mongoose";

const droneSchema = new mongoose.Schema({
  droneCode: String,
  status: {
    type: String,
    enum: ["IDLE", "DELIVERING", "CHARGING", "MAINTENANCE"],
    default: "IDLE"
  },
  batteryLevel: Number,
  baseStationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BaseStation"
  },
  lastMaintenance: Date
});

export const Drone = mongoose.model("Drone", droneSchema);
