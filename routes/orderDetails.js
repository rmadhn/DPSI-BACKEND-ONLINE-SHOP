const express = require("express");
const router = express.Router();
const db = require("../models"); // Sesuaikan dengan path model Anda

// GET all order details
router.get("/", async (req, res) => {
  try {
    const orderDetails = await db.OrderDetail.findAll();
    res.json(orderDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET order detail by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const orderDetail = await db.OrderDetail.findByPk(id);
    if (!orderDetail) {
      return res.status(404).json({ message: "Order detail not found" });
    }
    res.json(orderDetail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST create new order detail
router.post("/", async (req, res) => {
  const { orderID, productID, quantity } = req.body;
  try {
    const newOrderDetail = await db.OrderDetail.create({
      orderID,
      productID,
      quantity,
    });
    res.status(201).json(newOrderDetail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT update order detail
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { orderID, productID, quantity } = req.body;
  try {
    const orderDetail = await db.OrderDetail.findByPk(id);
    if (!orderDetail) {
      return res.status(404).json({ message: "Order detail not found" });
    }
    await orderDetail.update({ orderID, productID, quantity });
    res.json(orderDetail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE order detail
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const orderDetail = await db.OrderDetail.findByPk(id);
    if (!orderDetail) {
      return res.status(404).json({ message: "Order detail not found" });
    }
    await orderDetail.destroy();
    res.json({ message: "Order detail deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
