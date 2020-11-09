var express = require('express');
var router = express.Router();
var ctrlauth = require('../controllers/authenticationController');
var ctrlPrograms = require('../controllers/programController');
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.SECRETKEY,
  algorithms: ['HS256'],
  userProperty: 'payload'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Authentication */
router.post('/login', ctrlauth.login)
router.post('/register', ctrlauth.register)

/* Programs */
router.get('/programs', ctrlPrograms.index);
router.post('/programs',auth, ctrlPrograms.createProgram);
router.get('/program',auth,ctrlPrograms.workoutProgram);

/* Exercises */
router.post('/exercises/add',auth, ctrlPrograms.addExercise);

/* Activity Logs */
router.post('/programs/logs/add', ctrlPrograms.addLogActivity);


module.exports = router;
