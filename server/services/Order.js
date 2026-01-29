import { Order } from "../models/Order.js";
import { Package } from "../models/Package.js";
import { Drone } from "../models/Drone.js";
import { Station } from "../models/BaseStation.js";

export const createOrder = async ({ userId, packageData }) => {
  // 1. יצירת חבילה
  const newPackage = await Package.create(packageData);

  // 2. יצירת הזמנה
  const order = await Order.create({
    userId,
    packageId: newPackage._id,
    status: "created"
  });

  return order;
};

export const assignDroneToOrder = async (orderId) => {
  const order = await Order.findById(orderId);

  // 3. מציאת תחנה קרובה (בינתיים: ראשונה)
  const station = await Station.findOne();

  // 4. מציאת רחפן פנוי
  const drone = await Drone.findOne({
    stationId: station._id,
    status: "available"
  });

  if (!drone) throw new Error("No available drone");

  // 5. עדכונים
  drone.status = "on_mission";
  await drone.save();

  order.stationId = station._id;
  order.droneId = drone._id;
  order.status = "in_transit";
  await order.save();

  return order;
};

export const completeOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  order.status = "completed";
  order.completedAt = new Date();
  await order.save();

  // החזרת הרחפן
  const drone = await Drone.findById(order.droneId);
  drone.status = "available";
  await drone.save();

  return order;
};

export const cancelOrder = async (orderId) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { status: "cancelled" },
    { new: true }
  );
};

export const getOrdersByUser = async (userId) => {
  return await Order.find({ userId })
    .populate("packageId")
    .populate("droneId")
    .populate("stationId");
};
