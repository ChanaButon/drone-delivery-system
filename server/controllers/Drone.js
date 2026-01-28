import * as droneService from "../services/drone.service.js";

export const getDrones = async (req, res, next) => {
  try {
    const drones = await droneService.getAvailableDrones();
    res.json(drones);
  } catch (err) {
    next(err);
  }
};
