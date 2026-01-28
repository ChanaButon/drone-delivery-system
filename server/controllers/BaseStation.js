import * as baseStationService from "../services/baseStation.service.js";

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
    const stations = await baseStationService.getAllBaseStations();
    res.json(stations);
  } catch (err) {
    next(err);
  }
};

export const getStationById = async (req, res, next) => {
  try {
    const station = await baseStationService.getBaseStationById(req.params.id);
    res.json(station);
  } catch (err) {
    next(err);
  }
};

export const updateStation = async (req, res, next) => {
  try {
    const station = await baseStationService.updateBaseStation(
      req.params.id,
      req.body
    );
    res.json(station);
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
