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
};

module.exports.workoutProgram = async (req, res) => {

  var queryworkout = req.query.workoutid;

  await repo.getWorkoutProgram(queryworkout)
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

module.exports.createProgram = async (req, res) => {
  await repo.createProgram(req, res)
    .then((program) => {
      res
        .status(201)
        .send();
    })
    .catch(err => {
      res
        .status(404)
        .json(err);
    })
}

module.exports.addExercise = async (req, res) => {
  await repo.addExerciseToProgram(req, res)
    .then(exercise  => {
      res
        .status(200)
        .send();
    })
    .catch(err => {
      res
        .status(404)
        .json(err);
    })
}

module.exports.addLogActivity = async (req, res) => {
  await repo.addLogActivityToProgram(req, res)
    .then(logActivity  => {
      res
        .status(201)
        .send();
    })
    .catch(err => {
      res
        .status(404)
        .json(err);
    })
}