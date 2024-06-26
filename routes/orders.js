const express = require("express");
const router = express.Router();
const db = require("../models"); // Sesuaikan dengan path model Anda

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await db.Order.findAll();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET order by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const order = await db.Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST create new order
router.post("/", async (req, res) => {
  const { customerID, employeeID, orderDate, shipperID } = req.body;
  try {
    const newOrder = await db.Order.create({
      customerID,
      employeeID,
      orderDate,
      shipperID,
    });
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT update order
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { customerID, employeeID, orderDate, shipperID } = req.body;
  try {
    const order = await db.Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.update({ customerID, employeeID, orderDate, shipperID });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE order
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const order = await db.Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.destroy();
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
