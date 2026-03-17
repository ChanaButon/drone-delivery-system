import { Delivery } from "../models/Delivery.js";
import { Drone } from "../models/Drone.js";
import { getLatLngFromAddress } from "../utils/geocode.js";
import { calculatePrice } from "../utils/calculatePrice.js"
import { User } from "../models/User.js";
import { BaseStation } from "../models/BaseStation.js";
import { calculateDistance } from "../utils/distance.js";
import { addLog } from "./simulatorService.js";
import { createNotification } from "../services/Notification.js";



const findBestDrone = async (pickup, drop) => {

  const drones = await Drone.find({
    status: "available",
    batteryLevel: { $gte: 30 }
  });

  let bestDrone = null;
  let bestDistance = Infinity;

  for (const drone of drones) {

    const station = await BaseStation.findById(drone.baseStationId);
    if (!station) continue;

    const [droneLng, droneLat] = drone.location.coordinates;
    const [pickupLng, pickupLat] = pickup.coordinates;
    const [dropLng, dropLat] = drop.coordinates;
    const [stationLng, stationLat] = station.location.coordinates;

    const toPickup = calculateDistance(droneLat, droneLng, pickupLat, pickupLng);
    const toDrop = calculateDistance(pickupLat, pickupLng, dropLat, dropLng);
    const returnStation = calculateDistance(dropLat, dropLng, stationLat, stationLng);

    const totalDistance = toPickup + toDrop + returnStation;

    const requiredBattery = totalDistance * 2;

    if (drone.batteryLevel >= requiredBattery) {

      if (toPickup < bestDistance) {
        bestDistance = toPickup;
        bestDrone = drone;
      }

    }

  }

  return bestDrone;
};

export const assignDroneService = async (deliveryId) => {

  const delivery = await Delivery.findById(deliveryId);
  if (!delivery) return null;

  const drone = await findBestDrone(
    delivery.pickupLocation,
    delivery.deliveryLocation
  );

  if (!drone) {
    return null;
  }

  await Drone.findByIdAndUpdate(drone._id, { status: "delivering" });

  delivery.droneId = drone._id;
  delivery.status = "ASSIGNED";
  delivery.assignedAt = new Date();

  await delivery.save();

  await addLog({
    type: "DRONE_ASSIGNED",
    droneId: drone._id,
    deliveryId: delivery._id,
    message: `Drone assigned to delivery`,
  });

  await updateDeliveryStatusWithNotification(delivery, "ASSIGNED");

  return delivery;
};

export const createDeliveryService = async (deliveryData) => {

  const {
    receiverEmail,
    receiverName,
    receiverPhone,
    pickupCity,
    pickupStreet,
    pickupNumber,
    deliveryCity,
    deliveryStreet,
    deliveryNumber,
    weightRange,
    deliveryType,
    senderId
  } = deliveryData;
  console.log(deliveryData)

  const user = receiverEmail ? await User.findOne({ email: receiverEmail }) : null;

 const price = calculatePrice(weightRange, deliveryType)

  const pickup = await getLatLngFromAddress(
    pickupCity,
    pickupStreet,
    pickupNumber
  );
console.log(pickup)
  const drop = await getLatLngFromAddress(
    deliveryCity,
    deliveryStreet,
    deliveryNumber
  );
console.log(drop)
  const pickupAddress = `${pickupStreet} ${pickupNumber}, ${pickupCity}`;
  const deliveryAddress = `${deliveryStreet} ${deliveryNumber}, ${deliveryCity}`;
console.log(pickupAddress)
console.log(deliveryAddress)
  const delivery = new Delivery({
    senderId,
    receiverId: user?._id,

    receiver: user
      ? undefined
      : {
          name: receiverName,
          phone: receiverPhone
        },

    weightRange,
    deliveryType,
    price,

    pickupLocation: {
      type: "Point",
      coordinates: [pickup.lng, pickup.lat],
      address: pickupAddress
    },

    deliveryLocation: {
      type: "Point",
      coordinates: [drop.lng, drop.lat],
      address: deliveryAddress
    }
  });
   await createNotification({
      userId: delivery.senderId,
      deliveryId: delivery._id,
      message: "Your package has been created 🎉"
    });

  return await delivery.save();
};

export const getAllDeliveriesService = async () => {
  return await Delivery.find()
    .populate("senderId droneId");
};

export const getDeliveryByIdService = async (id) => {
  return await Delivery.findById(id)
    .populate("senderId droneId");
};

export const getDeliveriesByUserService = async (userId) => {
  return await Delivery.find({
    $or: [{ senderId: userId }, { receiverId: userId }]
  }).populate("senderId droneId");
};



export const updateDeliveryStatusService = async (deliveryId, status) => {
  return await Delivery.findByIdAndUpdate(
    deliveryId,
    { status },
    { new: true }
  ).populate("senderId droneId");
};

export const updateDeliveryService = async (deliveryId, updateData) => {
  const delivery = await Delivery.findById(deliveryId);

  if (!delivery) {
    throw new Error("Delivery not found");
  }

  if (delivery.status !== "CREATED") {
    throw new Error("Only deliveries with status CREATED can be updated");
  }

  const {
    pickupCity,
    pickupStreet,
    pickupNumber,
    deliveryCity,
    deliveryStreet,
    deliveryNumber,
    weightRange,
    deliveryType
  } = updateData;

  if (pickupCity && pickupStreet && pickupNumber) {
    const pickup = await getLatLngFromAddress(
      pickupCity,
      pickupStreet,
      pickupNumber
    );

    delivery.pickupLocation = {
      type: "Point",
      coordinates: [pickup.lng, pickup.lat],
      address: `${pickupStreet} ${pickupNumber}, ${pickupCity}`
    };
  }

  if (deliveryCity && deliveryStreet && deliveryNumber) {
    const drop = await getLatLngFromAddress(
      deliveryCity,
      deliveryStreet,
      deliveryNumber
    );

    delivery.deliveryLocation = {
      type: "Point",
      coordinates: [drop.lng, drop.lat],
      address: `${deliveryStreet} ${deliveryNumber}, ${deliveryCity}`
    };
  }

  if (weightRange) delivery.weightRange = weightRange;
  if (deliveryType) delivery.deliveryType = deliveryType;

  delivery.price = calculatePrice(weightRange, deliveryType)

  return await delivery.save();
};

export const deleteDeliveryService = async (deliveryId) => {
  const delivery = await Delivery.findById(deliveryId);

  if (!delivery) {
    throw new Error("Delivery not found");
  }

  if (delivery.status !== "CREATED") {
    throw new Error("Only deliveries with status CREATED can be deleted");
  }

  await Delivery.findByIdAndDelete(deliveryId);

  return { message: "Delivery deleted successfully" };
};


export const updateDeliveryStatusWithNotification = async (delivery, newStatus) => {

  delivery.status = newStatus;
  await delivery.save();

  let message = "";

  if (newStatus === "ASSIGNED") {
    message = "A drone has been assigned to your package ✈️";
  }

  if (newStatus === "PICKED_UP") {
    message = "Your package was picked up 📦";
  }

  if (newStatus === "DELIVERING") {
    message = "Your package is on the way 🚀";
  }

  if (newStatus === "DELIVERED") {
    message = "Your package has been delivered 🎉";
  }

  if (message) {
    await createNotification({
      userId: delivery.senderId,
      deliveryId: delivery._id,
      message
    });
  }

  return delivery;
};