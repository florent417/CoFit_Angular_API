var express = require('express');
var router = express.Router();
var ctrllogin = require('../controllers/loginController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', ctrllogin.login)

module.exports = router;
