import { BaseStation } from "../models/BaseStation.model.js";

export const createBaseStation = (data) => {
  const station = new BaseStation(data);
  return station.save();
};

export const getAllBaseStations = () => {
  return BaseStation.find();
};

export const getBaseStationById = (id) => {
  return BaseStation.findById(id);
};

export const updateBaseStation = (id, data) => {
  return BaseStation.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBaseStation = (id) => {
  return BaseStation.findByIdAndDelete(id);
};
