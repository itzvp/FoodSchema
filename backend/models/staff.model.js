const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const staffSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    availableDays: { type: [String], required: true },
    availableHours: {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
