const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personalInformationSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    age: { type: String },
    gender: { type: String },
    phone: { type: String },
    occupation: { type: String },
    department: { type: String },
    photo: { type: String }
});

module.exports = mongoose.model("PersonalInformation", personalInformationSchema);