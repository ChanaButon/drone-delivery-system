import express from "express";
import { connectDB } from "./config/db.js"
import droneRoutes from "./routers/Drone.js"
import baseStationRoutes from "./routers/BaseStation.js"
import userRoutes from "./routers/User.js"
import orderRoutes from "./routers/Order.js"
import pachageRoutes from "./routers/Package.js"
import dotenv from "dotenv";
const port = process.env.PORT;

dotenv.config();
const app = express();s

app.use(express.json());

await connectDB(); 

app.use("/api/base-stations", baseStationRoutes);
app.use("/api/drones", droneRoutes);
app.use("/api/user",userRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/pachage",pachageRoutes);

app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
