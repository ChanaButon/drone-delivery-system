import mongoose from "mongoose";

const simulatorLogSchema = new mongoose.Schema({
  type: { type: String },
  droneId: { type: mongoose.Schema.Types.ObjectId, ref: "Drone" },
  deliveryId: { type: mongoose.Schema.Types.ObjectId, ref: "Delivery" },
  message: String,
  timestamp: { type: Date, default: Date.now },
  readByAdmin: { type: Boolean, default: false }, // new
});

export const SimulatorLog = mongoose.model("SimulatorLog", simulatorLogSchema);