import express from "express";
import * as controller from "../controllers/Drone.js";

const router = express.Router();

router.post("/", controller.createDrone);
router.get("/", controller.getDrones);
router.get("/available", controller.getAvailableDrones);
router.get("/:id", controller.getDroneById);
router.put("/:id", controller.updateDrone);
router.delete("/:id", controller.deleteDrone);
router.patch("/:id/assign-station", controller.assignDroneToStation);
router.patch("/:id/charging", controller.sendToCharging);
router.patch("/:id/maintenance", controller.sendToMaintenance);
router.patch("/:id/available", controller.setAvailable);

export default router;
