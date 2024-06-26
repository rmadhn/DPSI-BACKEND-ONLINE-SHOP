const express = require("express");
const router = express.Router();
const db = require("../models"); // Sesuaikan dengan path model Anda

// GET all shippers
router.get("/", async (req, res) => {
  try {
    const shippers = await db.Shipper.findAll();
    res.json(shippers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET shipper by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const shipper = await db.Shipper.findByPk(id);
    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" });
    }
    res.json(shipper);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST create new shipper
router.post("/", async (req, res) => {
  const { shipperName, phone } = req.body;
  try {
    const newShipper = await db.Shipper.create({ shipperName, phone });
    res.status(201).json(newShipper);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT update shipper
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { shipperName, phone } = req.body;
  try {
    const shipper = await db.Shipper.findByPk(id);
    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" });
    }
    await shipper.update({ shipperName, phone });
    res.json(shipper);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE shipper
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const shipper = await db.Shipper.findByPk(id);
    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" });
    }
    await shipper.destroy();
    res.json({ message: "Shipper deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
