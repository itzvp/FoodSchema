const router = require("express").Router();
let Food = require("../models/food.model");

// Get all foods
router.route("/").get((req, res) => {
  Food.find()
    .then((foods) => res.json(foods))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add new food
router.route("/add").post((req, res) => {
  const { name, price, quality } = req.body;
  const newFood = new Food({ name, price, quality });

  newFood
    .save()
    .then(() => res.json("Food added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete food
router.route("/:id").delete((req, res) => {
  Food.findByIdAndDelete(req.params.id)
    .then(() => res.json("Food deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update food
router.route("/update/:id").post((req, res) => {
  Food.findById(req.params.id)
    .then((food) => {
      food.name = req.body.name;
      food.price = req.body.price;
      food.quality = req.body.quality;

      food
        .save()
        .then(() => res.json("Food updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
