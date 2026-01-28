import mongoose from "mongoose";

const baseStationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    lat: Number,
    lng: Number
  },
  capacity: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export const BaseStation = mongoose.model("BaseStation", baseStationSchema);
