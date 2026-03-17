
import {
  createDeliveryService,
  getAllDeliveriesService,
  getDeliveryByIdService,
  getDeliveriesByUserService,
  assignDroneService,
  updateDeliveryStatusService,
  updateDeliveryService,
  deleteDeliveryService
} from "../services/Delivery.js";

export const createDelivery = async (req, res) => {
  try {

    const delivery = await createDeliveryService({
      ...req.body,
      senderId: req.user.id
    });

    res.status(201).json(delivery);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDelivery = async (req, res) => {
  try {
    const delivery = await updateDeliveryService(req.params.id, req.body);
    res.json(delivery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteDelivery = async (req, res) => {
  try {
    const result = await deleteDeliveryService(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await getAllDeliveriesService();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDeliveryById = async (req, res) => {
  try {
    const delivery = await getDeliveryByIdService(req.params.id);
    if (!delivery) return res.status(404).json({ message: "Delivery not found" });
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDeliveriesByUser = async (req, res) => {
  try {
    const deliveries = await getDeliveriesByUserService(req.params.userId);
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignDroneToDelivery = async (req, res) => {

  try {

    const delivery = await assignDroneService(req.params.id);

    if (!delivery)
      return res.status(404).json({ message: "No available drone" });

    res.json(delivery);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }

};

export const updateDeliveryStatus = async (req, res) => {
  try {
    const delivery = await updateDeliveryStatusService(req.params.id, req.body.status);
    if (!delivery) return res.status(404).json({ message: "Delivery not found" });
    res.json(delivery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};