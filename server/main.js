import express from "express";
import { connectDB } from "./config/db.js"
import droneRoutes from "./routers/Drone.js"
import baseStationRoutes from "./routers/BaseStation.js"
import userRoutes from "./routers/User.js"
import deliveryRoutes from "./routers/Delivery.js";
import adminRouter from "./routers/simulatorRouter.js"
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import authRoutes from "./routers/auth.js";
import { startDroneSimulator } from "./simulators/batterySimulator.js";
import { startDroneMovementSimulator } from "./simulators/droneMovementSimulator.js";
import notificationRoutes from "./routers/Notification.js";
import { Server } from "socket.io";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();


app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.static(join(__dirname, "client/dist")));

await connectDB();
startDroneMovementSimulator();
startDroneSimulator()

app.use("/api/base-stations", baseStationRoutes);

app.use("/api/drones", droneRoutes);
app.use("/api/user", userRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", adminRouter);
app.use("/api", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Server is running ");
});
app.get(/.*/, (req, res) => {
  res.sendFile(join(__dirname, "client/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
