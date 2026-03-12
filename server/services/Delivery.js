import { Delivery } from "../models/Delivery.js";
import { getLatLngFromAddress } from "../utils/geocode.js";
import { calculatePrice } from "../utils/calculatePrice.js"
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

  const price = calculatePrice(weightRange, deliveryType)

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