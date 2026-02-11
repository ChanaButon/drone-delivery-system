import { Delivery } from "../models/Delivery.js";

export const createDeliveryService = async (deliveryData) => {
  const delivery = new Delivery(deliveryData);
  return await delivery.save();
};


export const getAllDeliveriesService = async () => {
  return await Delivery.find()
    .populate("senderId receiverId droneId stationId");
};


export const getDeliveryByIdService = async (id) => {
  return await Delivery.findById(id)
    .populate("senderId receiverId droneId stationId");
};


export const getDeliveriesByUserService = async (userId) => {
  return await Delivery.find({
    $or: [{ senderId: userId }, { receiverId: userId }]
  });
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
  );
};

export const updateDeliveryStatusService = async (deliveryId, status) => {
  return await Delivery.findByIdAndUpdate(
    deliveryId,
    { status },
    { new: true }
  );
};
