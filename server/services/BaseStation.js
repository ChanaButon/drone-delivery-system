import mongoose from "mongoose";
import { BaseStation } from "../models/BaseStation.js";
import { Drone } from "../models/Drone.js";


const validateId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid station ID");
  }
};


export const createBaseStation = async (data) => {
  return await BaseStation.create(data);
};


export const getAllBaseStations = async () => {
  return await BaseStation.find();
};


export const getBaseStationById = async (id) => {
  validateId(id);

  const station = await BaseStation.findById(id);
  if (!station) {
    throw new Error("Base station not found");
  }

  return station;
};


export const updateBaseStation = async (id, data) => {
  validateId(id);

  const station = await BaseStation.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  if (!station) {
    throw new Error("Base station not found");
  }

  return station;
};


export const deleteBaseStation = async (id) => {
  validateId(id);

  const dronesCount = await Drone.countDocuments({
    stationId: id
  });

  if (dronesCount > 0) {
    throw new Error(
      "Cannot delete station with assigned drones"
    );
  }

  const deleted = await BaseStation.findByIdAndDelete(id);
  if (!deleted) {
    throw new Error("Base station not found");
  }

  return;
};


export const countDronesInStation = async (stationId) => {
  validateId(stationId);

  return await Drone.countDocuments({ stationId });
};


export const hasFreeCapacity = async (stationId) => {
  validateId(stationId);

  const station = await BaseStation.findById(stationId);
  if (!station) {
    throw new Error("Base station not found");
  }

  const dronesCount = await Drone.countDocuments({
    stationId
  });

  return dronesCount < station.capacity;
};
