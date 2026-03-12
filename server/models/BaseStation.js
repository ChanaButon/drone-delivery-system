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

const baseStationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    location: locationSchema,
    capacity: {
      type: Number,
      required: true,
      min: 1
    },
    status: {
      type: String,
      enum: ["active", "maintenance", "offline"],
      default: "active"
    }
  },
  { timestamps: true }
);

export const BaseStation = mongoose.model(
  "BaseStation",
  baseStationSchema
);
