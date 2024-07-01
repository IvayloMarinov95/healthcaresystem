const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Prescription = require("../models/prescriptions");
const User = require('../models/users');
const Medication = require('../models/medications');
const Disease = require('../models/diseases');

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

    for (prescription of prescriptions) {
        try {
            const disease = await Disease.findById(prescription.disease);
            prescription.disease = disease.nameEn;
        } catch (err) {
            const error = new HttpError(
                "Fetching medication failed, please try again later.",
                500
            );
            return next(error);
        }
    }


    const medicinesArray = [];
    prescriptions.forEach(prescription => medicinesArray.push(prescription.medicineList));

    const medicinesLists = medicinesArray.flat(1);
    for (medicine of medicinesLists) {
        try {
            const medication = await Medication.findById(medicine.medicineName);
            medicine.medicineName = medication.name;
        } catch (err) {
            const error = new HttpError(
                "Fetching medication failed, please try again later.",
                500
            );
            return next(error);
        }
    }

    res.json({ prescriptions: prescriptions.map((prescription) => prescription.toObject({ getter: true })) });
};

const mostFrequent = (items, k) => {
    let lookup = {};
    let output = [];
    let itemCounter = 0;

    for (let i = 0;i < items.length;i++) {
        // Have we seen this item before or not?
        if (!lookup[items[i]]) {
            // No? Ok, create an object in our lookup
            // and set reference to it in our output array
            lookup[items[i]] = { "count": 0, "id": items[i] };
            output.push(lookup[items[i]]);
            itemCounter++;
        }
        // Add one to the "count" attribute in our lookup
        // which adds one to the count attribute in our "output" array
        lookup[items[i]].count++;
    }

    //
    // Sort descending, Slice the top {{k}} results, and return it to the user
    // so they can handle it
    //
    return output.sort((a, b) => { return a.count > b.count ? -1 : 1 }).slice(0, k)
}

const getFiveMostFrequentMedications = async (req, res, next) => {
    let prescriptions;
    try {
        prescriptions = await Prescription.find().populate();
    } catch (err) {
        const error = new HttpError(
            "Fetching prescriptions failed, please try again later.",
            500
        );
        return next(error);
    }

    const medicinesArray = [];
    prescriptions.forEach(prescription => medicinesArray.push(prescription.medicineList));

    const medicinesLists = medicinesArray.flat(1);

    let medicationsList = [];
    medicinesLists.forEach(list => medicationsList.push(list.medicineName));

    const topFive = mostFrequent(medicationsList, 5);
    const topFiveDetailed = [];
    for (element of topFive) {
        try {
            medication = await Medication.findById(element.id);
            topFiveDetailed.push({ ...medication._doc, count: element.count });
        } catch (err) {
            const error = new HttpError(
                "Fetching medication failed, please try again later.",
                500
            );
            return next(error);
        }
    }

    res.json(topFiveDetailed);
}

const getFiveMostFrequentDiseases = async (req, res, next) => {
    let prescriptions;
    try {
        prescriptions = await Prescription.find().populate();
    } catch (err) {
        const error = new HttpError(
            "Fetching prescriptions failed, please try again later.",
            500
        );
        return next(error);
    }

    const diseases = [];
    prescriptions.forEach(prescription => diseases.push(prescription.disease));

    const topFive = mostFrequent(diseases, 5);
    const topFiveDetailed = [];
    for (element of topFive) {
        try {
            disease = await Disease.findById(element.id);
            topFiveDetailed.push({ ...disease._doc, count: element.count });
        } catch (err) {
            const error = new HttpError(
                "Fetching medication failed, please try again later.",
                500
            );
            return next(error);
        }
    }
    res.json(topFiveDetailed);
}

const getMedicineList = async (req, res, next) => {
    let medications;
    try {
        medications = await Medication.find();
    } catch (err) {
        const error = new HttpError(
            "Fetching prescriptions failed, please try again later.",
            500
        );
        return next(error);
    }
    res.json({ medications: medications.map((medication) => medication.toObject({ getter: true })) });
}

const getDiseases = async (req, res, next) => {
    let diseases;
    try {
        diseases = await Disease.find().limit(7000);
    } catch (err) {
        const error = new HttpError(
            "Fetching prescriptions failed, please try again later.",
            500
        );
        return next(error);
    }
    res.json({ diseases: diseases.map((disease) => disease.toObject({ getter: true })) });
}

const getPrescriptionsByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let prescriptions;
    try {
        prescriptions = await Prescription.find({ user: userId }).sort({ _id: -1 });
    } catch (err) {
        const error = new HttpError(
            "Fetching prescriptions failed, please try again later.",
            500
        );
        return next(error);
    }

    for (prescription of prescriptions) {
        try {
            const disease = await Disease.findById(prescription.disease);
            prescription.disease = disease.nameEn;
        } catch (err) {
            const error = new HttpError(
                "Fetching medication failed, please try again later.",
                500
            );
            return next(error);
        }
    }


    const medicinesArray = [];
    prescriptions.forEach(prescription => medicinesArray.push(prescription.medicineList));

    const medicinesLists = medicinesArray.flat(1);
    for (medicine of medicinesLists) {
        try {
            const medication = await Medication.findById(medicine.medicineName);
            medicine.medicineName = medication.name;
        } catch (err) {
            const error = new HttpError(
                "Fetching medication failed, please try again later.",
                500
            );
            return next(error);
        }
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
exports.getMedicineList = getMedicineList;
exports.getFiveMostFrequentMedications = getFiveMostFrequentMedications;
exports.getFiveMostFrequentDiseases = getFiveMostFrequentDiseases;
exports.getDiseases = getDiseases;
exports.getPrescriptionsByUserId = getPrescriptionsByUserId;
exports.createPrescription = createPrescription;
exports.updatePrescriptionStatus = updatePrescriptionStatus;
exports.deletePrescription = deletePrescription;