import mongoose from "mongoose";
import { Package } from "../models/Package.js";
import { Drone } from "../models/Drone.js";
import { BaseStation } from "../models/BaseStation.js";


const validateId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID");
  }
};


export const createPackage = async (data) => {
  if (data.weight <= 0) {
    throw new Error("Invalid package weight");
  }

  return await Package.create(data);
};


export const getAllPackages = async () => {
  return await Package.find()
    .populate("droneId")
    .populate("stationId");
};


export const getPackageById = async (id) => {
  validateId(id);

  const pkg = await Package.findById(id)
    .populate("droneId")
    .populate("stationId");

  if (!pkg) throw new Error("Package not found");
  return pkg;
};

export const deletePackage = async (id) => {
  validateId(id);

  const pkg = await Package.findById(id);
  if (!pkg) throw new Error("Package not found");

  if (pkg.status !== "CREATED") {
    throw new Error("Cannot delete package after assignment");
  }

  await pkg.deleteOne();
};

export const assignDroneToPackage = async (packageId) => {
  validateId(packageId);

  const pkg = await Package.findById(packageId);
  if (!pkg) throw new Error("Package not found");

  if (pkg.status !== "CREATED") {
    throw new Error("Package already processed");
  }

  const station = await BaseStation.findOne();
  if (!station) throw new Error("No base station available");

  const dronesCount = await Drone.countDocuments({
    stationId: station._id
  });

  if (dronesCount >= station.capacity) {
    throw new Error("Station is full");
  }

  const drone = await Drone.findOne({
    status: "available",
    batteryLevel: { $gte: 30 }
  });

  if (!drone) {
    throw new Error("No available drone");
  }

  drone.status = "delivering";
  drone.stationId = station._id;
  await drone.save();

  pkg.status = "ASSIGNED";
  pkg.droneId = drone._id;
  pkg.stationId = station._id;
  await pkg.save();

  return pkg;
};

export const markInTransit = async (id) =>
  Package.findByIdAndUpdate(
    id,
    { status: "IN_TRANSIT" },
    { new: true }
  );

export const markDelivered = async (id) =>
  Package.findByIdAndUpdate(
    id,
    { status: "delivering" },
    { new: true }
  );

export const markFailed = async (id) =>
  Package.findByIdAndUpdate(
    id,
    { status: "FAILED" },
    { new: true }
  );


export const getPackagesBySender = async (userId) =>
  Package.find({ senderId: userId });

export const getPackagesByReceiver = async (userId) =>
  Package.find({ receiverId: userId });


export const completeDelivery = async (packageId) => {
  const pkg = await Package.findById(packageId);
  if (!pkg) throw new Error("Package not found");

  if (pkg.status !== "IN_TRANSIT") {
    throw new Error("Package is not in transit");
  }

  const drone = await Drone.findById(pkg.droneId);
  if (!drone) throw new Error("Assigned drone not found");

  pkg.status = "DELIVERED";
  await pkg.save();


  drone.status = drone.batteryLevel < 30 ? "CHARGING" : "IDLE";
  drone.currentPackageId = null;
  await drone.save();

  return { message: "Delivery completed and drone released" };
};
