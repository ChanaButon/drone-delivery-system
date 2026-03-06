import express from "express";
import {
  createDelivery,
  getAllDeliveries,
  getDeliveryById,
  getDeliveriesByUser,
  assignDroneToDelivery,
  updateDeliveryStatus
} from "../controllers/Delivery.js";

const router = express.Router();

router.post("/", createDelivery);
router.get("/", getAllDeliveries);
router.get("/:id", getDeliveryById);
router.get("/user/:userId", getDeliveriesByUser);
router.patch("/:id/assign-drone", assignDroneToDelivery);
router.patch("/:id/status", updateDeliveryStatus);

export default router;