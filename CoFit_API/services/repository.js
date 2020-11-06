const mongoose = require("mongoose");
const UserModel = require("../models/user");
const WorkoutProgramModel = require("../models/workoutProgram");
const ExerciseModel = require("../models/exercise");

// TODO: How to do this as a promis, since its double trip to db
exports.createProgram = async (workoutProgramName, userId) => {
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

exports.getAllWorkoutPrograms = () => {
    return new Promise((resolve, reject) => 
        WorkoutProgramModel.find({}, 
            (err, res) => {
                err ? reject(err) : resolve(res)
                /*
                if (err) {
                    console.log(err);
                    // TODO: Send error res back
                } else {
                    reso
                    //res.json(result);
                }
                */
            }
        )
    );
}

// TODO: User parameter
exports.getAllWorkoutProgramsForUser =  async (userid) => {
    return new Promise((resolve, reject) => 
        WorkoutProgramModel.find({"createdBy": userid}, 
            (err, res) => 
                err ? reject(err) : resolve(res)
        )
    );
};

exports.getWorkoutProgramForUser =  async (workoutProgramId) => {
    let workoutProgramObjectId = mongoose.Types.ObjectId(workoutProgramId);
    
    return new Promise((resolve, reject) => {
        WorkoutProgramModel.findById(workoutProgramObjectId, (err, res) => 
        err ? reject(err) : resolve(res));
    }) 
};

exports.updateWorkoutProgramExercises = async (req) => {
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

// This is best practice i suppose?
exports.createUser = function(user){
    return new Promise(function(resolve, reject) {
        UserModel.create(user, (err, res) => err ? reject(err) : resolve(res))
    });
}
    


//UserModel.create(user, (err, res) => err ? reject(err) : resolve(res))

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