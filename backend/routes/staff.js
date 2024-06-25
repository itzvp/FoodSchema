const router = require("express").Router();
let Staff = require("../models/staff.model");

// Get all staff
router.route("/").get((req, res) => {
  Staff.find()
    .then((staff) => res.json(staff))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add new staff
router.route("/add").post((req, res) => {
  const { name, email, phone, availableDays, availableHours } = req.body;
  const newStaff = new Staff({
    name,
    email,
    phone,
    availableDays,
    availableHours,
  });

  newStaff
    .save()
    .then(() => res.json("Staff added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete staff
router.route("/:id").delete((req, res) => {
  Staff.findByIdAndDelete(req.params.id)
    .then(() => res.json("Staff deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update staff
router.route("/update/:id").post((req, res) => {
  Staff.findById(req.params.id)
    .then((staff) => {
      staff.name = req.body.name;
      staff.email = req.body.email;
      staff.phone = req.body.phone;
      staff.availableDays = req.body.availableDays;
      staff.availableHours = req.body.availableHours;

      staff
        .save()
        .then(() => res.json("Staff updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
