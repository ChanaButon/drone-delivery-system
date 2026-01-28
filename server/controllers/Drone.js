import * as droneService from "../services/drone.service.js";

export const createDrone = async (req, res, next) => {
  try {
    const drone = await droneService.createDrone(req.body);
    res.status(201).json(drone);
  } catch (err) {
    next(err);
  }
};

export const getDrones = async (req, res, next) => {
  try {
    const drones = await droneService.getAllDrones();
    res.json(drones);
  } catch (err) {
    next(err);
  }
};

export const getDroneById = async (req, res, next) => {
  try {
    const drone = await droneService.getDroneById(req.params.id);
    res.json(drone);
  } catch (err) {
    next(err);
  }
};

export const updateDrone = async (req, res, next) => {
  try {
    const drone = await droneService.updateDrone(req.params.id, req.body);
    res.json(drone);
  } catch (err) {
    next(err);
  }
};

export const deleteDrone = async (req, res, next) => {
  try {
    await droneService.deleteDrone(req.params.id);
    res.json({ message: "Drone deleted" });
  } catch (err) {
    next(err);
  }
};
