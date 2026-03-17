import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  deliveryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Delivery"
  },

  type: {
    type: String,
    enum: ["DELIVERY_UPDATE", "SYSTEM"],
    default: "DELIVERY_UPDATE"
  },

  message: {
    type: String,
    required: true
  },

  read: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export const Notification = mongoose.model("Notification", notificationSchema);