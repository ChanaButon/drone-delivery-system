import { Drone } from "../models/Drone.model.js";

export const getAvailableDrones = async () => {
  return Drone.find({
    status: "IDLE",
    batteryLevel: { $gt: 30 }
  });
};

export const updateDroneStatus = async (droneId, status) => {
  return Drone.findByIdAndUpdate(droneId, { status }, { new: true });
};
