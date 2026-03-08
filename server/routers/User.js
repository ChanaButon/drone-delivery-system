import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  getAll,
  removeUser
} from "../controllers/User.js";

const router = express.Router();
router.get("/", getAll);      
router.delete("/:id", removeUser);
router.post("/register", register);
router.post("/login", login);
router.get("/:id", getProfile);
router.put("/:id", updateProfile);

export default router;