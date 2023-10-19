const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  role: { type: String, required: true, ref: "Role" },
  personalInformation: { type: mongoose.Types.ObjectId, ref: "PersonalInformation" },
  prescriptions: [{ type: mongoose.Types.ObjectId, ref: 'Prescription' }],
  referrals: [{ type: mongoose.Types.ObjectId, ref: 'Referral' }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
