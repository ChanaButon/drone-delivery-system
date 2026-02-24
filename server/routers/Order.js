import express from "express";
import {
  createOrder,
  assignDroneToOrder,
  completeOrder,
  cancelOrder,
  getOrdersByUser
} from "../controllers/Order.js";

const router = express.Router();

router.post("/", createOrder);
router.post("/:id/assign", assignDroneToOrder);
router.post("/:id/complete", completeOrder);
router.post("/:id/cancel", cancelOrder);
router.get("/user/:userId", getOrdersByUser);

export default router;
