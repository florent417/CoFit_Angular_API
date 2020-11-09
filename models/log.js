const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logSchema = new Schema(
    {
        text: String,
        createdBy: String
    }
);

module.exports = mongoose.model("Log", logSchema);
