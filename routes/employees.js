const express = require("express");
const router = express.Router();
const db = require("../models"); // Sesuaikan dengan path model Anda

// GET all employees
router.get("/", async (req, res) => {
  try {
    const employees = await db.Employee.findAll();
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET employee by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await db.Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST create new employee
router.post("/", async (req, res) => {
  const { lastName, firstName, birthDate, photo, notes } = req.body;
  try {
    const newEmployee = await db.Employee.create({
      lastName,
      firstName,
      birthDate,
      photo,
      notes,
    });
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT update employee
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { lastName, firstName, birthDate, photo, notes } = req.body;
  try {
    const employee = await db.Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await employee.update({ lastName, firstName, birthDate, photo, notes });
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE employee
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await db.Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await employee.destroy();
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
