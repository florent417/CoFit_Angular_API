var express = require('express');
var router = express.Router();
var ctrlauth = require('../controllers/authenticationController');
var ctrlPrograms = require('../controllers/programController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', ctrlauth.login)
router.post('/register', ctrlauth.register)

/* Programs */
router.get('/programs', ctrlPrograms.index);
router.post('/programs', ctrlPrograms.createProgram);
router.get('/program', ctrlPrograms.workoutProgram);

/* Exercises */
router.post('/exercises/add', ctrlPrograms.addExercise);

/* Activity Logs */
router.post('/programs/logs/add', ctrlPrograms.addLogActivity);


module.exports = router;
