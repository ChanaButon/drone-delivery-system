import express from "express";
import {
  createPackage,
  getPackages,
  getPackageById,
  deletePackage,
  assignDrone,
  markInTransit,
  markDelivered,
  markFailed,
  completeDelivery
} from "../controllers/Package.js";

const router = express.Router();

router.post("/", createPackage);
router.get("/", getPackages);
router.get("/:id", getPackageById);
router.delete("/:id", deletePackage);

router.patch("/:id/assign-drone", assignDrone);
router.patch("/:id/in-transit", markInTransit);
router.patch("/:id/delivered", markDelivered);
router.patch("/:id/failed", markFailed);
router.patch("/:id/complete", completeDelivery);


export default router;
