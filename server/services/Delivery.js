import { Delivery } from "../models/Delivery.js";
import { getLatLngFromAddress } from "../utils/geocode.js";
import { User } from "../models/User.js";

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

  let price = 20;

  if (weightRange === "5-10") price += 10;
  if (weightRange === "10-20") price += 20;
  if (deliveryType === "FAST") price += 15;

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