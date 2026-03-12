import mongoose from "mongoose";


const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    default: "Point"
  },
  coordinates: {
    type: [Number],
  }
});
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
  location:locationSchema,
  speed:{
    type: Number,
    default: 150
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