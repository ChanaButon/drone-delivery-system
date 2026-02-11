import { Drone } from "../models/Drone.js";
import mongoose from "mongoose";



const validateId = (id) => mongoose.Types.ObjectId.isValid(id);


export const createDrone = async (data) => {
  if (!data.droneCode || data.batteryLevel == null) {
    throw { status: 400, message: "Missing required fields" };
  }

  return Drone.create(data);
};


export const getAllDrones = () =>
  Drone.find().populate("baseStationId");

export const getDroneById = async (id) => {
  if (!validateId(id))
    throw { status: 400, message: "Invalid drone ID" };

  const drone = await Drone.findById(id).populate("baseStationId");
  if (!drone)
    throw { status: 404, message: "Drone not found" };

  return drone;
};


export const updateDrone = async (id, data) => {
  if (!validateId(id))
    throw { status: 400, message: "Invalid drone ID" };

  const drone = await Drone.findById(id);
  if (!drone)
    throw { status: 404, message: "Drone not found" };

  Object.assign(drone, data);
  return drone.save();
};


export const deleteDrone = async (id) => {
  const drone = await getDroneById(id);

  if (drone.status !== "available") {
    throw {
      status: 400,
      message: "Cannot delete drone unless status is available"
    };
  }

  await drone.deleteOne();
};


export const assignDroneToStation = async (droneId, stationId) => {
  const drone = await getDroneById(droneId);

  if (!validateId(stationId))
    throw { status: 400, message: "Invalid station ID" };

  const station = await BaseStation.findById(stationId);
  if (!station)
    throw { status: 404, message: "Base station not found" };

  if (drone.status !== "available")
    throw {
      status: 400,
      message: "Drone must be available to assign"
    };

  drone.baseStationId = stationId;
  return drone.save();
};


export const sendToCharging = async (id) => {
  const drone = await getDroneById(id);

  if (drone.status !== "available")
    throw {
      status: 400,
      message: "Only available drones can be charged"
    };

  drone.status = "charging";
  return drone.save();
};


export const sendToMaintenance = async (id) => {
  const drone = await getDroneById(id);

  if (drone.status !== "available")
    throw {
      status: 400,
      message: "Only available drones can enter maintenance"
    };

  drone.status = "InMaintenance";
  drone.lastMaintenance = new Date();
  return drone.save();
};

export const setAvailable = async (id) => {
  const drone = await getDroneById(id);

  if (!["charging", "InMaintenance"].includes(drone.status)) {
    throw {
      status: 400,
      message: "Drone is not in a recoverable state"
    };
  }

  drone.status = "available";
  return drone.save();
};


export const getAvailableDrones = () =>
  Drone.find({
    status: "available",
    batteryLevel: { $gte: 30 }
  });
