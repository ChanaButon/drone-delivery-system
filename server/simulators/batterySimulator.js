import { Drone } from "../models/Drone.js";
import { addLog } from "../services/simulatorService.js";

export const startDroneSimulator = () => {

  setInterval(async () => {

    const drones = await Drone.find();

    for (const drone of drones) {

      let eventMessage = null;

      if (drone.status === "charging") {

        const prevBattery = drone.batteryLevel;

        drone.batteryLevel = Math.min(100, drone.batteryLevel + 1);

        if (prevBattery < 100 && drone.batteryLevel === 100) {
          drone.status = "available";
          eventMessage = "Drone fully charged and ready";
        }

      }

      if (drone.status === "delivering") {

        const prevBattery = drone.batteryLevel;

        drone.batteryLevel = Math.max(0, drone.batteryLevel - 0.5);

        if (prevBattery > 20 && drone.batteryLevel <= 20) {
          eventMessage = "Drone battery critical during delivery";
        }

      }

      if (drone.status === "available" && drone.batteryLevel < 40) {
        drone.status = "charging";
        eventMessage = "Drone battery low, switching to charging";
      }

      await drone.save();

      if (eventMessage) {
        await addLog({
          type: "DRONE_STATUS",
          droneId: drone._id,
          deliveryId: null,
          message: eventMessage,
        });
      }

    }

  }, 20000);

};