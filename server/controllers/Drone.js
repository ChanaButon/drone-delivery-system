import * as droneService from "../services/Drone.js";

export const createDrone = async (req, res, next) => {
  try {
    res.status(201).json(await droneService.createDrone(req.body));
  } catch (e) {
    next(e);
  }
};

export const getDrones = async (req, res, next) => {
  try {
    res.json(await droneService.getAllDrones());
  } catch (e) {
    next(e);
  }
};

export const getDroneById = async (req, res, next) => {
  try {
    console.log("BODY:", req.params.id);
    res.json(await droneService.getDroneById(req.params.id));
  } catch (e) {
    next(e);
  }
};

export const updateDrone = async (req, res, next) => {
  try {
    console.log("BODY:", req.body);
    res.json(await droneService.updateDrone(req.params.id, req.body));
  } catch (e) {
    next(e);
  }
};

export const deleteDrone = async (req, res, next) => {
  try {
    await droneService.deleteDrone(req.params.id);
    res.json({ message: "Drone deleted" });
  } catch (e) {
    next(e);
  }
};

export const assignDroneToStation = async (req, res, next) => {
  try {
    res.json(
      await droneService.assignDroneToStation(
        req.params.id,
        req.body.stationId
      )
    );
  } catch (e) {
    next(e);
  }
};

export const sendToCharging = async (req, res, next) => {
  try {
    res.json(await droneService.sendToCharging(req.params.id));
  } catch (e) {
    next(e);
  }
};

export const sendToMaintenance = async (req, res, next) => {
  try {
    res.json(await droneService.sendToMaintenance(req.params.id));
  } catch (e) {
    next(e);
  }
};

export const setAvailable = async (req, res, next) => {
  try {
    res.json(await droneService.setAvailable(req.params.id));
  } catch (e) {
    next(e);
  }
};

export const getAvailableDrones = async (req, res, next) => {
  try {
    res.json(await droneService.getAvailableDrones());
  } catch (e) {
    next(e);
  }
};
