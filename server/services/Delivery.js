import { Delivery } from "../models/Delivery.js";

/**
 * יצירת משלוח חדש
 */
export const createDeliveryService = async (deliveryData) => {
  const delivery = new Delivery(deliveryData);
  return await delivery.save();
};

/**
 * שליפת כל המשלוחים
 */
export const getAllDeliveriesService = async () => {
  return await Delivery.find()
    .populate("senderId receiverId droneId stationId");
};

/**
 * שליפת משלוח לפי ID
 */
export const getDeliveryByIdService = async (id) => {
  return await Delivery.findById(id)
    .populate("senderId receiverId droneId stationId");
};

/**
 * משלוחים של לקוח (שולח או מקבל)
 */
export const getDeliveriesByUserService = async (userId) => {
  return await Delivery.find({
    $or: [{ senderId: userId }, { receiverId: userId }]
  });
};

/**
 * שיבוץ רחפן למשלוח
 */
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

/**
 * עדכון סטטוס משלוח
 */
export const updateDeliveryStatusService = async (deliveryId, status) => {
  return await Delivery.findByIdAndUpdate(
    deliveryId,
    { status },
    { new: true }
  );
};
