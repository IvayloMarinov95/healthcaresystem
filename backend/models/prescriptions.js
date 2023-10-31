const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const medicineListSchema = new Schema({
    medicineName: { type: String, required: true },
    quantity: { type: String, required: true },
    consumptionFrequency: { type: String, required: true },
    prescriptionDose: { type: String, required: true },
    period: { type: String, required: true }
});

const prescriptionSchema = new Schema({
    patientName: { type: String, required: true },
    disease: { type: String, required: true },
    additionalInformation: { type: String },
    status: { type: String },
    user: { type: String, required: true, ref: "User" },
    medicineList: [medicineListSchema]
});

module.exports = mongoose.model("Prescription", prescriptionSchema);