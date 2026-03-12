import { Drone } from "./models/Drone.js";
import { Delivery } from "./models/Delivery.js";

export const startDroneSimulator = () => {

  setInterval(async () => {

    const drones = await Drone.find();

    for (const drone of drones) {

      if (drone.status === "charging") {

        drone.batteryLevel = Math.min(100, drone.batteryLevel + 1);

        if (drone.batteryLevel >= 100) {
          drone.status = "available";
        }

      }

      if (drone.status === "delivering") {

        drone.batteryLevel = Math.max(0, drone.batteryLevel - 0.5);
      }

      if (drone.status === "available" && drone.batteryLevel < 40) {
        drone.status = "charging";
      }

      await drone.save();

    }

  }, 20000);

};