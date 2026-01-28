import express from "express";
import { connectDB } from "./config/db.js"
import droneRoutes from "./routers/Drone.js"
import baseStationRoutes from "./routers/BaseStation.js"
import dotenv from "dotenv";
const port = process.env.PORT;

dotenv.config();
const app = express();

app.use(express.json());

await connectDB(); 

app.use("/api/base-stations", baseStationRoutes);
app.use("/api/drones", droneRoutes);


app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
