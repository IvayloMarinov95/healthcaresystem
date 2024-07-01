const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const referralSchema = new Schema({
    user: { type: String, ref: "User" },
    patientPersonalId: { type: String },
    rhif: { type: String },
    healthDistrict: { type: String },
    idNumber: { type: String },
    countryCode: { type: String },
    dateOfBirth: { type: String },
    patientFullName: { type: String },
    city: { type: String },
    street: { type: String },
    streetNumber: { type: String },
    residentialComplex: { type: String },
    block: { type: String },
    entrance: { type: String },
    floor: { type: String },
    apartment: { type: String },
    medicalPlaceReferringRegNumber: { type: String },
    referringDoctorPersonalId: { type: String },
    referringDoctorType: { type: String },
    referringReplacementDoctorPersonalId: { type: String },
    referringSpecialtyCode: { type: String },
    referringDoctorFullName: { type: String },
    referralNumber: { type: String },
    primaryDiagnosis: { type: String },
    accompanyingIllness1: { type: String },
    accompanyingIllness2: { type: String },
    medicalPlaceRegNumber: { type: String },
    specialtyCode: { type: String },
    doctorPersonalId: { type: String },
    doctorFullName: { type: String },
    reason: { type: String },
    status: { type: String },
});

module.exports = mongoose.model("Referrals", referralSchema);