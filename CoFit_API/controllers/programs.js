const repo = require("../services/repository");

module.exports.index = async (req, res) => {
  await repo.getAllWorkoutPrograms()
  .then(workoutPrograms => {
    res
      .status(200)
      .send(workoutPrograms);
  })
  .catch(err =>{
    res
      .status(400)
      .json(err);
  });
  /*
  await repo.getAllWorkoutPrograms(req, res);
  console.log(res.body);
  */
};

module.exports.workoutProgram = async (req, res) => {
  console.log(req.body);
  await repo.getWorkoutProgram(req)
    .then(workoutProgram => {
      res
        .status(200)
        .send(workoutProgram);
    })
    .catch(err => {
      res
        .status(404)
        .json(err);
    });
}
//5f6dbc959242e01a4cfe9d2a
// TODO: change this
module.exports.createProgram = async (req, res) => {
  await repo.createProgram(req, res);
    //repo.createWorkout(programName, userId);
}