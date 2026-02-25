import express from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import {
  register,
  login,
  getProfile,
  updateProfile,
  getAll,
  removeUser
} from "../controllers/User.js";

const router = express.Router();
router.get("/", protect, adminOnly, getAll);
router.delete("/:id", protect, adminOnly, removeUser);
router.get("/:id", protect, getProfile);
router.put("/:id", protect, updateProfile);



export default router;