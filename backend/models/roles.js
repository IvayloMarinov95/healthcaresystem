const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  role: { type: String },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Role", roleSchema);
