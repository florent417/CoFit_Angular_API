const mongoose = require("mongoose");
const UserModel = require("../models/user");
const WorkoutProgramModel = require("../models/workoutProgram");
const ExerciseModel = require("../models/exercise");

exports.createProgram = async (req, res) => {
    const workoutProgram = new WorkoutProgramModel();
    workoutProgram.name = req.body.name;
    workoutProgram.createdBy = req.body.createdBy;

    return new Promise((resolve, reject) => {
        UserModel.findByIdAndUpdate(req.body.createdBy, { 
            $push: { 
                workoutPrograms: workoutProgram._id 
            }
        }, (err, res) => {
                if(err) reject(err);
                else {
                    WorkoutProgramModel.create(workoutProgram, (err, res) => {
                        err ? reject(err) : resolve(res);
                    })
                }
            }
        );
    });
};

exports.getAllWorkoutPrograms = () => {
    return new Promise((resolve, reject) => 
        WorkoutProgramModel.find({}, 
            (err, res) => err ? reject(err) : resolve(res)
        )
    );
}

exports.getWorkoutProgram =  async (req) => {
    console.log(req)

    let workoutProgramObjectId = mongoose.Types.ObjectId(req);
    
    console.log('mongose')
    
    return new Promise((resolve, reject) => {
        WorkoutProgramModel.findById(workoutProgramObjectId, (err, res) => 
        err ? reject(err) : resolve(res));
    }) 
};

exports.addExerciseToProgram = async (req) => {
    const exercise = new ExerciseModel({
        name: req.body.name,
        description: req.body.description,
        nbrOfSets: req.body.sets,
        nbrOfReps: req.body.reps,
        totalTime: req.body.time 
    });
    return new Promise((resolve, reject) => {
        WorkoutProgramModel.findByIdAndUpdate(req.body.programId, { 
            $push: { 
                exercises: exercise
            }
        }, (err, res) => err ? reject(err) : resolve(res));
    }) 
};

exports.addLogActivityToProgram = async (req) => {
    return new Promise((resolve, reject) => {
        WorkoutProgramModel.findByIdAndUpdate(req.body.programId, { 
            $push: { 
                logs: req.body.logActivity 
            }
        }, (err, res) => err ? reject(err) : resolve(res));
    }) 
};

// This is best practice i suppose?
exports.createUser = function(user){
    return new Promise(function(resolve, reject) {
        UserModel.create(user, (err, res) => err ? reject(err) : resolve(res))
    });
}
    


//UserModel.create(user, (err, res) => err ? reject(err) : resolve(res))

/*
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

*/

exports.validateUser = function(user){
    return new Promise(function(resolve, reject){
        UserModel.findOne({'userName': user.userName}, (err, res) => err ? reject(err) : resolve(res))
    })
}