import { Delivery } from "../models/Delivery.js";

export const createDeliveryService = async (deliveryData) => {
  const { weight, deliveryType } = deliveryData;
  let price = weight * 5;
  if (deliveryType === "FAST") price += 10;
  const delivery = new Delivery({ ...deliveryData, price });
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

export const assignDroneService = async (deliveryId, droneId) => {
  return await Delivery.findByIdAndUpdate(
    deliveryId,
    {
      droneId,
      status: "ASSIGNED",
      assignedAt: new Date()
    },
    { new: true }
  ).populate("senderId droneId");
};

export const updateDeliveryStatusService = async (deliveryId, status) => {
  return await Delivery.findByIdAndUpdate(
    deliveryId,
    { status },
    { new: true }
  ).populate("senderId droneId");
};