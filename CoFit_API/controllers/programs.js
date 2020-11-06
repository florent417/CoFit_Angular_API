const repo = require("../services/repository");

module.exports.index = async (req, res) => {
  await repo.getAllWorkoutPrograms(req, res);
  console.log(res.body);
};

module.exports.createProgram = (programName, userId) => {
    repo.createWorkout(programName, userId);
}