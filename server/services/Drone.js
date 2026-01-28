import { Drone } from "../models/Drone.model.js";

export const createDrone = (data) => {
  const drone = new Drone(data);
  return drone.save();
};

export const getAllDrones = () => {
  return Drone.find().populate("baseStationId");
};

export const getDroneById = (id) => {
  return Drone.findById(id).populate("baseStationId");
};

export const updateDrone = (id, data) => {
  return Drone.findByIdAndUpdate(id, data, { new: true });
};

export const deleteDrone = (id) => {
  return Drone.findByIdAndDelete(id);
};
