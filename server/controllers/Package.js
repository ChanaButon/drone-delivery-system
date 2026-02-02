import * as packageService from "../services/Package.js";

export const createPackage = async (req, res, next) => {
  try {
    res.status(201).json(
      await packageService.createPackage(req.body)
    );
  } catch (err) {
    next(err);
  }
};

export const getPackages = async (req, res, next) => {
  try {
    res.json(await packageService.getAllPackages());
  } catch (err) {
    next(err);
  }
};

export const getPackageById = async (req, res, next) => {
  try {
    res.json(await packageService.getPackageById(req.params.id));
  } catch (err) {
    next(err);
  }
};

export const deletePackage = async (req, res, next) => {
  try {
    await packageService.deletePackage(req.params.id);
    res.json({ message: "Package deleted" });
  } catch (err) {
    next(err);
  }
};

export const assignDrone = async (req, res, next) => {
  try {
    res.json(
      await packageService.assignDroneToPackage(req.params.id)
    );
  } catch (err) {
    next(err);
  }
};

export const markInTransit = async (req, res, next) => {
  try {
    res.json(await packageService.markInTransit(req.params.id));
  } catch (err) {
    next(err);
  }
};

export const markDelivered = async (req, res, next) => {
  try {
    res.json(await packageService.markDelivered(req.params.id));
  } catch (err) {
    next(err);
  }
};

export const markFailed = async (req, res, next) => {
  try {
    res.json(await packageService.markFailed(req.params.id));
  } catch (err) {
    next(err);
  }
};

export const completeDelivery = async (req, res, next) => {
  try {
    res.json(
      await packageService.completeDelivery(req.params.id)
    );
  } catch (err) {
    next(err);
  }
};
