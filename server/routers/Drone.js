import express from "express";
import { getDrones } from "../controllers/drone.controller.js";

const router = express.Router();

router.get("/", getDrones);

export default router;
