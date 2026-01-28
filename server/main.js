import express from "express";
import mongoose from "mongoose";
import droneRoutes from "./routes/drone.routes.js";
import packageRoutes from "./routes/package.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

// routes
app.use("/api/drones", droneRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/users", userRoutes);

// error handling
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => console.log("Server running 🚀"));
  });
