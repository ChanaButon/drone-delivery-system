import mongoose from "mongoose";

const baseStationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    capacity: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { timestamps: true }
);

export const BaseStation = mongoose.model(
  "BaseStation",
  baseStationSchema
);
