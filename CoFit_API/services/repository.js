const mongoose = require("mongoose");
const UserModel = require("../models/user");
const WorkoutProgramModel = require("../models/workoutProgram");
const ExerciseModel = require("../models/exercise");

exports.createWorkout = async (workoutProgramName, userId) => {
    const workoutProgram = new WorkoutProgramModel();
    workoutProgram.name = workoutProgramName;
    workoutProgram.createdBy = userId;

    const currentUser = UserModel.findByIdAndUpdate(userId, { 
        $push: { 
            workoutPrograms: workoutProgram._id 
        }
    }).then( async resolve => {
        return await WorkoutProgramModel.create(workoutProgram);
    }, err => {
        console.log(err);
    });

};

// TODO: User parameter
exports.getAllWorkoutProgramsForUser =  async (userid) => {
    return await WorkoutProgramModel.find({"createdBy": userid});
};

exports.getWorkoutProgramForUser =  async (workoutProgramId) => {
    let workoutProgramObjectId = mongoose.Types.ObjectId(workoutProgramId);
    
    return await WorkoutProgramModel.findById(workoutProgramObjectId);
};

exports.updateWorkoutProgramExercises = async (req) => {
    const exercise = new ExerciseModel({
        name: req.body.name,
        description: req.body.description,
        nbrOfSets: req.body.sets,
        nbrOfReps: req.body.reps,
        totalTime: req.body.time 
    });
    return await WorkoutProgramModel.findByIdAndUpdate(req.body.programId, { 
        $push: { 
            exercises: exercise 
        }
    });
};

exports.createUser = async (user) => {
    console.log('In Repository')
    console.log(user)
    return await UserModel.create(user, function (error, user){
        if(error){
            console.log(error)
        }
    })
};

exports.validateUserByUsernamePassword = async (user) => {
    console.log(user)
    return await UserModel.findOne({'userName': user.username}, function(err, person){
        if(err){
            console.log(err)
            return;
        }
        if(person != null){
            console.log('Person found, validating...')            
        }
    })
};