import express from "express";
<<<<<<< HEAD
import {
  createDrone,
  getDrones,
  getDroneById,
  updateDrone,
  deleteDrone
} from "../controllers/Drone.js";
=======
import * as controller from "../controllers/Drone.js";
>>>>>>> c7aabc8c7ce8036d099ce080d6a994de10b7bf5c

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
