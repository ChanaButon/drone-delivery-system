import express from "express";
import { connectDB } from "./config/db.js"
import droneRoutes from "./routers/Drone.js"
import baseStationRoutes from "./routers/BaseStation.js"
import userRoutes from "./routers/User.js"
import orderRoutes from "./routers/Order.js"
import pachageRoutes from "./routers/Package.js"
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.static(join(__dirname, "client/dist")));

await connectDB(); 

app.use("/api/base-stations", baseStationRoutes);
app.use("/api/drones", droneRoutes);
app.use("/api/user",userRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/pachage",pachageRoutes);

app.get("/", (req, res) => {
  res.send("Server is running ");
});
app.get(/.*/, (req, res) => {
  res.sendFile(join(__dirname, "client/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
