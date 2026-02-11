import  {BaseStation}  from "../models/BaseStation.js";
import mongoose from "mongoose";

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

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // רדיוס כדור הארץ בק"מ

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

export const findNearestBaseStation = async (location) => {
  const stations = await BaseStation.find();
  if (!stations.length) {
    throw new Error("No base stations available");
  }

  let nearest = null;
  let minDistance = Infinity;

  for (const station of stations) {
    const distance = calculateDistance(
      location.lat,
      location.lng,
      station.location.lat,
      station.location.lng
    );

    const dronesCount = await Drone.countDocuments({
      stationId: station._id
    });

    if (
      distance < minDistance &&
      dronesCount < station.capacity
    ) {
      minDistance = distance;
      nearest = station;
    }
  }

  if (!nearest) {
    throw new Error("No station with free capacity");
  }

  return nearest;
};
