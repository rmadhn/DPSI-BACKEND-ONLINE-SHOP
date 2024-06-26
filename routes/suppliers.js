const express = require("express");
const router = express.Router();
const db = require("../models"); // Sesuaikan dengan path model Anda

// GET all suppliers
router.get("/", async (req, res) => {
  try {
    const suppliers = await db.Supplier.findAll();
    res.json(suppliers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET supplier by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const supplier = await db.Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json(supplier);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST create new supplier
router.post("/", async (req, res) => {
  const {
    supplierName,
    contactName,
    address,
    city,
    postalCode,
    country,
    phone,
  } = req.body;
  try {
    const newSupplier = await db.Supplier.create({
      supplierName,
      contactName,
      address,
      city,
      postalCode,
      country,
      phone,
    });
    res.status(201).json(newSupplier);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT update supplier
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const {
    supplierName,
    contactName,
    address,
    city,
    postalCode,
    country,
    phone,
  } = req.body;
  try {
    const supplier = await db.Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    await supplier.update({
      supplierName,
      contactName,
      address,
      city,
      postalCode,
      country,
      phone,
    });
    res.json(supplier);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE supplier
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const supplier = await db.Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    await supplier.destroy();
    res.json({ message: "Supplier deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
