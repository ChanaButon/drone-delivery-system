import express from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import {
  getProfile,
  updateProfile,
  getAll,
  removeUser,
  getCurrentUser
} from "../controllers/User.js";

const router = express.Router();
router.get("/me", protect, getCurrentUser);

router.get("/", protect, adminOnly, getAll);
router.get("/:id", protect, getProfile);
router.put("/:id", protect, updateProfile);
router.delete("/:id", protect, adminOnly, removeUser);



export default router;