import { Delivery } from "../models/Delivery.js";
import { assignDroneService } from "../services/Delivery.js";
import { addLog } from "../services/simulatorService.js"


export const startAssignmentSimulator = () => {

  setInterval(async () => {

    try {

      const deliveries = await Delivery.find({
        status: "CREATED",
        droneId: null
      });

      for (const delivery of deliveries) {
        await assignDroneService(delivery._id);
        await addLog({
        type: "DRONE_ASSIGNED",
        droneId: drone._id,
        deliveryId: delivery._id,
        message: `Drone assigned to delivery at ${new Date().toLocaleString()}`,
        });
      }

     

    } catch (err) {
      console.log("Assignment simulator error:", err.message);
    }

  }, 5000);

};