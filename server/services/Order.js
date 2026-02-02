import { Order } from "../models/Order.js";
import { Drone } from "../models/Drone.js";
import { BaseStation } from "../models/BaseStation.js";

/**
 * יצירת הזמנה מינימלית
 * כרגע: רק userId
 */
export const createOrder = async ({ userId }) => {
  const order = await Order.create({
    userId,
    status: "created"
  });

  return order;
};

/**
 * שיבוץ רחפן להזמנה (אופציונלי – אם יש לך כבר רחפנים ותחנות)
 */
export const assignDroneToOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");

  const station = await BaseStation.findOne();
  if (!station) throw new Error("No station found");

  const drone = await Drone.findOne({
    stationId: station._id,
    status: "available"
  });

  if (!drone) throw new Error("No available drone");

  drone.status = "on_mission";
  await drone.save();

  order.stationId = station._id;
  order.droneId = drone._id;
  order.status = "in_transit";
  await order.save();

  return order;
};

/**
 * סיום הזמנה
 */
export const completeOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");

  order.status = "completed";
  order.completedAt = new Date();
  await order.save();

  if (order.droneId) {
    const drone = await Drone.findById(order.droneId);
    if (drone) {
      drone.status = "available";
      await drone.save();
    }
  }

  return order;
};

/**
 * ביטול הזמנה
 */
export const cancelOrder = async (orderId) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { status: "cancelled" },
    { new: true }
  );
};

/**
 * שליפת כל ההזמנות של משתמש
 */
export const getOrdersByUser = async (userId) => {
  return await Order.find({ userId })
    .populate("droneId")
    .populate("stationId");
};
