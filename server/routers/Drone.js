import express from "express";
import {
  createDrone,
  getDrones,
  getDroneById,
  updateDrone,
  deleteDrone
} from "../controllers/Drone.js";

const router = express.Router();

router.post("/", createDrone);
router.get("/", getDrones);
router.get("/:id", getDroneById);
router.put("/:id", updateDrone);
router.delete("/:id", deleteDrone);

export default router;
