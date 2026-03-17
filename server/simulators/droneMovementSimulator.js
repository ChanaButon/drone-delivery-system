import { Drone } from "../models/Drone.js";
import { Delivery } from "../models/Delivery.js";
import { BaseStation } from "../models/BaseStation.js";
import { addLog } from "../services/simulatorService.js";
import { createNotification } from "../services/Notification.js"; 

const moveTowards = (current, target, speed) => {
  const [lng, lat] = current;
  const [tLng, tLat] = target;
  const step = speed * 0.000001;
  const newLat = lat + Math.sign(tLat - lat) * step;
  const newLng = lng + Math.sign(tLng - lng) * step;
  return [newLng, newLat];
};

const reachedTarget = (current, target) => {
  const [lng, lat] = current;
  const [tLng, tLat] = target;
  return Math.abs(lat - tLat) < 0.0003 && Math.abs(lng - tLng) < 0.0003;
};

export const startDroneMovementSimulator = () => {
  setInterval(async () => {
    const drones = await Drone.find({ status: "delivering" });

    for (const drone of drones) {
      const delivery = await Delivery.findOne({
        droneId: drone._id,
        status: { $in: ["ASSIGNED", "LOADING", "IN_FLIGHT"] },
      });

      if (!delivery) continue;

      let target = delivery.status === "ASSIGNED" ? delivery.pickupLocation.coordinates : delivery.deliveryLocation.coordinates;

      drone.location.coordinates = moveTowards(drone.location.coordinates, target, drone.speed);
      drone.batteryLevel -= 0.3;

     if (reachedTarget(drone.location.coordinates, target)) {
  if (delivery.status === "ASSIGNED") {
    delivery.status = "LOADING";
    delivery.pickedUpAt = new Date();

    await addLog({
      type: "DELIVERY_STATUS_CHANGED",
      droneId: drone._id,
      deliveryId: delivery._id,
      message: "Picked up package"
    });

    await createNotification({
      userId: delivery.senderId,
      deliveryId: delivery._id,
      message: "Your package has been picked up 📦"
    });

  } else if (delivery.status === "LOADING") {
    delivery.status = "IN_FLIGHT";

    await addLog({
      type: "DELIVERY_STATUS_CHANGED",
      droneId: drone._id,
      deliveryId: delivery._id,
      message: "In flight to destination"
    });

    await createNotification({
      userId: delivery.senderId,
      deliveryId: delivery._id,
      message: "Your package is on the way 🚀"
    });

  } else if (delivery.status === "IN_FLIGHT") {
    delivery.status = "DELIVERED";
    delivery.deliveredAt = new Date();

    const station = await BaseStation.findById(drone.baseStationId);
    drone.status = "available";
    drone.location = station.location;

    await addLog({
      type: "DELIVERY_STATUS_CHANGED",
      droneId: drone._id,
      deliveryId: delivery._id,
      message: "Delivered package and returned to base"
    });

    await createNotification({
      userId: delivery.senderId,
      deliveryId: delivery._id,
      message: "Your package has been delivered 🎉"
    });
  }
}

      await Drone.findByIdAndUpdate(drone._id, { location: drone.location, batteryLevel: drone.batteryLevel, status: drone.status });
      await delivery.save();
    }
  }, 3000);
};