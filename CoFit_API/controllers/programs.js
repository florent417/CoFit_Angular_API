const repo = require("../services/repository");

module.exports.index = async (req, res) => {
  await repo.getAllWorkoutPrograms()
  .then( workoutPrograms => {
    res.status(200).send(workoutPrograms);
  })
  .catch(err =>{
    res.send(400)
    .json(err);
  })
  /*
  await repo.getAllWorkoutPrograms(req, res);
  console.log(res.body);
  */

};

// TODO: change this
module.exports.createProgram = async (programName, userId) => {
  await repo.createProgram(programName, userId);
    //repo.createWorkout(programName, userId);
}