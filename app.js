var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/user');
var profileRouter = require('./routes/profile');
var companyRouter = require('./routes/company');
var jobListingRouter = require('./routes/jobListing');
var jobApplicationRouter = require('./routes/jobApplication');
var jobApplicationStatusRouter = require('./routes/jobApplicationStatus');
var informationonRouter = require('./routes/information');

var mongoose = require('mongoose')
mongoose.connect(process.env.MD_URL)
  .then(() => {
    console.log("connection success");

  })
  .catch((error) => {
    console.log(error);

  })

var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/', userRouter);
app.use('/profile', profileRouter);
app.use('/company', companyRouter);
app.use('/jobListing', jobListingRouter);
app.use('/jobApplication', jobApplicationRouter);
app.use('/jobApplicationStatus', jobApplicationStatusRouter);
app.use('/information', informationonRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
