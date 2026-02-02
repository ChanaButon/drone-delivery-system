import express from "express";
<<<<<<< HEAD
=======
import { connectDB } from "./config/db.js"
import droneRoutes from "./routers/Drone.js"
import baseStationRoutes from "./routers/BaseStation.js"
import userRoutes from "./routers/User.js"
import orderRoutes from "./routers/Order.js"
import pachageRoutes from "./routers/Package.js"
>>>>>>> c7aabc8c7ce8036d099ce080d6a994de10b7bf5c
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import droneRoutes from "./routers/Drone.js";
import baseStationRoutes from "./routers/BaseStation.js";
import userRoutes from "./routers/User.js";
import orderRoutes from "./routers/Order.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

await connectDB();

app.use("/api/base-stations", baseStationRoutes);
app.use("/api/drones", droneRoutes);
<<<<<<< HEAD
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
=======
app.use("/api/user",userRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/pachage",pachageRoutes);
>>>>>>> c7aabc8c7ce8036d099ce080d6a994de10b7bf5c

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
