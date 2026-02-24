import * as orderService from "../services/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, packageData } = req.body;

    const order = await orderService.createOrder({
      userId,
      packageData
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const assignDroneToOrder = async (req, res) => {
  try {
    const order = await orderService.assignDroneToOrder(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const completeOrder = async (req, res) => {
  try {
    const order = await orderService.completeOrder(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await orderService.cancelOrder(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUser(req.params.userId);
    res.json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
