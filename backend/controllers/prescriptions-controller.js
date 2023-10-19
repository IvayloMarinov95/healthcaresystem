const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Prescription = require("../models/prescriptions");
const User = require('../models/users');

const getPrescriptions = async (req, res, next) => {
    let prescriptions;
    try {
        prescriptions = await Prescriptions.find();
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
    const { patientName, disease, additionalInformation, user, medicineList } = req.body;

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


exports.getPrescriptions = getPrescriptions;
exports.createPrescription = createPrescription;