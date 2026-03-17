import { BaseStation } from "../models/BaseStation.js";
import { Drone } from "../models/Drone.js";
import mongoose from "mongoose";

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
    baseStationId: id
  });

  if (dronesCount > 0) {
    throw new Error("Cannot delete station with assigned drones");
  }

  const deleted = await BaseStation.findByIdAndDelete(id);

  if (!deleted) {
    throw new Error("Base station not found");
  }
};

export const countDronesInStation = async (stationId) => {
  validateId(stationId);

  return await Drone.countDocuments({
    baseStationId: stationId
  });
};

export const hasFreeCapacity = async (stationId) => {
  validateId(stationId);

  const station = await BaseStation.findById(stationId);

  if (!station) {
    throw new Error("Base station not found");
  }

  const dronesCount = await Drone.countDocuments({
    baseStationId: stationId
  });

  return dronesCount < station.capacity;
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};


export const getStationsWithFreeCapacity = async () => {
  const stations = await BaseStation.find();

  const result = [];

  for (const station of stations) {
    const dronesCount = await Drone.countDocuments({
      baseStationId: station._id
    });

    if (dronesCount < station.capacity) {
      result.push(station);
    }
  }

  return result;
};