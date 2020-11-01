const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
    {
        name: String,
        description: String,
        nbrOfSets: Number,
        nbrOfReps: {
            type: Number,
            required: false
        },
        totalTime: {
            type: Number,
            required: false
        },
    }
);

module.exports = mongoose.model("Exercise", exerciseSchema);
