var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var cors = require('cors')
require('dotenv').config()

// TODO: Change var names
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


let dbURI = "mongodb://localhost/CoFitDb";
//let dbURI = "mongodb+srv://thomasflorent:thomasflorent@cluster0.5c4uh.mongodb.net/test";
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
}


mongoose.connect(dbURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false 
});


// TODO: Remove, test purposes
mongoose.connection.on("connected", () => {
    console.log(`DB started with string: ${dbURI}`);
    console.log(mongoose.connection.name);
});

var app = express();

app.use(cors())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
