var express = require('express');
var router = express.Router();
var ctrlauth = require('../controllers/authenticationController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', ctrlauth.login)
router.post('/register', ctrlauth.register)

module.exports = router;
