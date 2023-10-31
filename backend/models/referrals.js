const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const referralSchema = new Schema({
    user: { type: String, ref: "User" },
    patientPersonalId: { type: String, minLength: 10, maxLength: 10, required: true },
    rhif: { type: String, minLength: 2, maxLength: 2, required: true },
    healthDistrict: { type: String, minLength: 2, maxLength: 2, required: true },
    idNumber: { type: String, minLength: 20, maxLength: 20, required: true },
    countryCode: { type: String, minLength: 2, maxLength: 2, required: true },
    dateOfBirth: { type: String, required: true },
    patientFullName: { type: String, required: true },
    city: { type: String },
    street: { type: String },
    streetNumber: { type: String },
    residentialComplex: { type: String },
    block: { type: String },
    entrance: { type: String },
    floor: { type: String },
    apartment: { type: String },
    medicalPlaceReferringRegNumber: { type: String, minLength: 10, maxLength: 10, required: true },
    referringDoctorPersonalId: { type: String, minLength: 10, maxLength: 10 },
    referringDoctorType: { type: String, required: true },
    referringReplacementDoctorPersonalId: { type: String, minLength: 10, maxLength: 10 },
    referringSpecialtyCode: { type: String, minLength: 2, maxLength: 2, required: true },
    referringDoctorFullName: { type: String, required: true },
    referralNumber: { type: String, minLength: 6, maxLength: 6, required: true },
    primaryDiagnosis: { type: String, minLength: 8, maxLength: 8, required: true },
    accompanyingIllness1: { type: String, minLength: 8, maxLength: 8 },
    accompanyingIllness2: { type: String, minLength: 8, maxLength: 8 },
    medicalPlaceRegNumber: { type: String, minLength: 10, maxLength: 10, required: true },
    specialtyCode: { type: String, minLength: 2, maxLength: 2, required: true },
    doctorPersonalId: { type: String, minLength: 10, maxLength: 10, required: true },
    doctorFullName: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String },
});

module.exports = mongoose.model("Referrals", referralSchema);