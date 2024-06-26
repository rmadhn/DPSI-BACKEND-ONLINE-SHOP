const express = require("express");
const router = express.Router();
const db = require("../models"); // Sesuaikan dengan path model Anda

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await db.Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET category by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const category = await db.Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST create new category
router.post("/", async (req, res) => {
  const { categoryName, description } = req.body;
  try {
    const newCategory = await db.Category.create({ categoryName, description });
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT update category
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { categoryName, description } = req.body;
  try {
    const category = await db.Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.update({ categoryName, description });
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE category
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const category = await db.Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
