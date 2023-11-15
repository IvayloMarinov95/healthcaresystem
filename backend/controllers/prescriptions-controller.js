const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Prescription = require("../models/prescriptions");
const User = require('../models/users');

const getPrescriptions = async (req, res, next) => {
    let prescriptions;
    try {
        prescriptions = await Prescription.find().sort({ _id: -1 });
    } catch (err) {
        const error = new HttpError(
            "Fetching prescriptions failed, please try again later.",
            500
        );
        return next(error);
    }
    res.json({ prescriptions: prescriptions.map((prescription) => prescription.toObject({ getter: true })) });
};

const createPrescription = async (req, res, next) => {
    const { patientName, disease, additionalInformation, status, user, medicineList } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        const error = new HttpError(
            "Creating prescription failed, please try again later",
            500
        );
        return next(error);
    }

    const createdPrescription = new Prescription({
        patientName,
        disease,
        additionalInformation,
        user,
        status,
        medicineList
    });

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPrescription.save({ session: sess });
        existingUser.prescriptions.push(createdPrescription);
        await existingUser.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            "Creating prescription failed, please try again later.",
            500
        );
        return next(error);
    };

    res.status(201).json({ prescription: createdPrescription });
};

const updatePrescriptionStatus = async (req, res, next) => {
    const prescriptionId = req.params.pid;
    const { status } = req.body;

    let updatedPrescription;
    try {
        updatedPrescription = await Prescription.findById(prescriptionId);
    } catch (err) {
        const error = new HttpError("Could not find prescription by the provided id, please try again later.", 500);
        return next(error);
    }

    updatedPrescription.status = status;
    try {
        await updatedPrescription.save();
    } catch (err) {
        const error = new HttpError("Could not update prescription, please try again later.", 500);
        return next(error);
    }

    res.status(200).json({ prescription: updatedPrescription.toObject({ getters: true }) });
};

const deletePrescription = async (req, res, next) => {
    const prescriptionId = req.params.pid;

    let prescription;
    try {
        prescription = await Prescription.findById(prescriptionId).populate("user");
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not delete prescription.",
            500
        );
        return next(error);
    }

    if (!prescription) {
        const error = new HttpError("Could not find prescription for this id.", 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await prescription.remove({ session: sess });
        prescription.user.prescriptions.pull(prescription);
        await prescription.user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not delete prescription.",
            500
        );
        return next(error);
    }

    res.status(200).json({ message: "Prescription is deleted." });
};

exports.getPrescriptions = getPrescriptions;
exports.createPrescription = createPrescription;
exports.updatePrescriptionStatus = updatePrescriptionStatus;
exports.deletePrescription = deletePrescription;