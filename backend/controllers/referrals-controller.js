const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Referral = require("../models/referrals");
const User = require("../models/users");

const getReferrals = async (req, res, next) => {
    let referrals;
    try {
        referrals = await Referral.find().sort({ _id: -1 });
    } catch (err) {
        const error = new HttpError(
            "Fetching referrals failed, please try again later.",
            500
        );
        return next(error);
    }
    res.json({ referrals: referrals.map((referral) => referral.toObject({ getter: true })) });
};

const getReferralsByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let referrals;
    try {
        referrals = await Referral.find({ user: userId }).sort({ _id: -1 });
    } catch (err) {
        const error = new HttpError(
            "Fetching referrals failed, please try again later.",
            500
        );
        return next(error);
    }
    res.json({ referrals: referrals.map((referral) => referral.toObject({ getter: true })) });
};

const createReferral = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError("Invalid inputs passed, please check your data.", 422);
    }

    const {
        user,
        patientPersonalId,
        rhif,
        healthDistrict,
        idNumber,
        countryCode,
        dateOfBirth,
        patientFullName,
        city,
        street,
        streetNumber,
        residentialComplex,
        block,
        entrance,
        floor,
        apartment,
        medicalPlaceReferringRegNumber,
        referringDoctorPersonalId,
        referringDoctorType,
        referringReplacementDoctorPersonalId,
        referringSpecialtyCode,
        referringDoctorFullName,
        referralNumber,
        primaryDiagnosis,
        accompanyingIllness1,
        accompanyingIllness2,
        medicalPlaceRegNumber,
        specialtyCode,
        doctorPersonalId,
        doctorFullName,
        reason,
        status
    } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        const error = new HttpError(
            "Creating referral failed, please try again later",
            500
        );
        return next(error);
    }

    const createdReferral = new Referral({
        user,
        patientPersonalId,
        rhif,
        healthDistrict,
        idNumber,
        countryCode,
        dateOfBirth,
        patientFullName,
        city,
        street,
        streetNumber,
        residentialComplex,
        block,
        entrance,
        floor,
        apartment,
        medicalPlaceReferringRegNumber,
        referringDoctorPersonalId,
        referringDoctorType,
        referringReplacementDoctorPersonalId,
        referringSpecialtyCode,
        referringDoctorFullName,
        referralNumber,
        primaryDiagnosis,
        accompanyingIllness1,
        accompanyingIllness2,
        medicalPlaceRegNumber,
        specialtyCode,
        doctorPersonalId,
        doctorFullName,
        reason,
        status
    });

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdReferral.save({ session: sess });
        existingUser.referrals.push(createdReferral);
        await existingUser.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            "Creating referral failed, please try again later.",
            500
        );
        return next(error);
    };

    res.status(201).json({ referral: createdReferral });
};

const updateReferralStatus = async (req, res, next) => {
    const referralId = req.params.rid;
    const { status } = req.body;

    let updatedReferral;
    try {
        updatedReferral = await Referral.findById(referralId);
    } catch (err) {
        const error = new HttpError("Could not find referral by the provided id, please try again later.", 500);
        return next(error);
    }

    updatedReferral.status = status;

    try {
        await updatedReferral.save();
    } catch (err) {
        const error = new HttpError("Could not update referral, please try again later.", 500);
        return next(error);
    }

    res.status(200).json({ referral: updatedReferral.toObject({ getter: true }) });

};

const deleteReferral = async (req, res, next) => {
    const referralId = req.params.rid;

    let referral;
    try {
        referral = await Referral.findById(referralId).populate("user");
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not delete referral.",
            500
        );
        return next(error);
    }

    if (!referral) {
        const error = new HttpError("Could not find referral for this id.", 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await referral.remove({ session: sess });
        referral.user.referrals.pull(referral);
        await referral.user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not delete referral.",
            500
        );
        return next(error);
    }
    res.status(200).json({ message: "Referral is deleted." });
};

exports.getReferrals = getReferrals;
exports.getReferralsByUserId = getReferralsByUserId;
exports.createReferral = createReferral;
exports.updateReferralStatus = updateReferralStatus;
exports.deleteReferral = deleteReferral;