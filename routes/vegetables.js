// routes/vegetables.js
const express = require("express");
const router = express.Router();
const vegetablesData = require("../models/vegetables");

// Index route for veggies
router.get("/", (req, res) => {
  res.render("vegetables/Index", { vegetables: vegetablesData });
});

// Show route
router.get("/:id", (req, res) => {
  const vegetableId = parseInt(req.params.id);
  const vegetable = vegetablesData.find((v) => v.id === vegetableId);

  if (!vegetable) {
    return res.status(404).send("Vegetable not found");
  }

  res.render("vegetables/Show", { vegetable });
});

// New route - creates a new vegetable
router.get("/new", (req, res) => {
  res.render("vegetables/New");
});

// Create route - adds a new vegetable
router.post("/", (req, res) => {
  const { name, color, img } = req.body;
  if (!name || !color || !img) {
    return res.status(400).send("All fields are required");
  }
  const newVegetable = {
    id: vegetablesData.length + 1, // Assign a new ID based on the length of the array
    name,
    color,
    img,
  };
  vegetablesData.push(newVegetable);
  res.redirect("/");
});

module.exports = router;
