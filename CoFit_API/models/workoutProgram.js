const mongoose = require("mongoose");
const ExerciseSchema = require("./exercise").schema;

const Schema = mongoose.Schema;

const workoutProgram = new Schema(
    {
        name : {
            type: String, 
            required: true
        },
        exercises: {
            type:[ExerciseSchema],
            default: []
        }, 
        createdBy: {
            type: Schema.Types.ObjectId, 
            ref: "User"
        },
        logs:  {
            type: [String],
            required: false
        },
    }
);

module.exports = mongoose.model("WorkoutProgram", workoutProgram);

// Good reference https://stackoverflow.com/questions/43251869/mongoose-create-with-push-for-multiple-refs