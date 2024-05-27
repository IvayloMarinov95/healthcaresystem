const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const diseaseSchema = new Schema({
    code: { type: String },
    nameBg: { type: String },
    nameEn: { type: String },
});

module.exports = mongoose.model("Disease", diseaseSchema);