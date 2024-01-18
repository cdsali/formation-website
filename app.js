var createError = require('http-errors');
var express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var formation = require('./routes/formation');
var formateur = require('./routes/formateur');
var contact = require('./routes/contact');






var app = express();








// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/ETADMIN', adminRouter);

app.use('/formation', formation);

app.use('/formateur', formateur);

app.use('/contact', contact);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen(process.env.PORT || 3600, () => { console.log("open") });


module.exports = app;
