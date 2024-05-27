const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const medicationSchema = new Schema({
  code: { type: String },
  name: { type: String },
});

module.exports = mongoose.model("Medication", medicationSchema);