import * as baseStationService from "../services/BaseStation.js";

export const createStation = async (req, res, next) => {
  try {
    const station = await baseStationService.createBaseStation(req.body);
    res.status(201).json(station);
  } catch (err) {
    next(err);
  }
};

export const getStations = async (req, res, next) => {
  try {
    res.json(await baseStationService.getAllBaseStations());
  } catch (err) {
    next(err);
  }
};

export const getStationById = async (req, res, next) => {
  try {
    res.json(await baseStationService.getBaseStationById(req.params.id));
  } catch (err) {
    next(err);
  }
};

export const updateStation = async (req, res, next) => {
  try {
    res.json(
      await baseStationService.updateBaseStation(
        req.params.id,
        req.body
      )
    );
  } catch (err) {
    next(err);
  }
};

export const deleteStation = async (req, res, next) => {
  try {
    await baseStationService.deleteBaseStation(req.params.id);
    res.json({ message: "Base station deleted" });
  } catch (err) {
    next(err);
  }
};

export const countDrones = async (req, res, next) => {
  try {
    res.json({
      count: await baseStationService.countDronesInStation(
        req.params.id
      )
    });
  } catch (err) {
    next(err);
  }
};

export const checkCapacity = async (req, res, next) => {
  try {
    res.json({
      hasFreeCapacity:
        await baseStationService.hasFreeCapacity(req.params.id)
    });
  } catch (err) {
    next(err);
  }
};
