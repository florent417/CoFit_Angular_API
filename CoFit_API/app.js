var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


let dbURI = "mongodb://localhost/CoFitDb";
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
}

/*
// HEROKU
mongoose.connect(dbURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false 
});
*/

// TODO: Remove, test purposes
mongoose.connection.on("connected", () => {
    console.log(`DB started with string: ${dbURI}`);
    console.log(mongoose.connection.name);
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
