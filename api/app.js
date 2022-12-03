var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var getAllPropertiesRouter = require("./routes/getAllProperties");
var getPropertyRouter = require("./routes/getProperty");
var getPurchaseRequestsRouter = require("./routes/getPurchaseRequests");
var processPurchaseRequestRouter = require("./routes/processPurchaseRequest")
var getUserPropertiesRouter = require("./routes/getUserProperties")
var getPropertyRouter = require("./routes/getProperty")

var app = express();
app.use(cors());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/", getAllPropertiesRouter);
app.use("/property", getPropertyRouter);
app.use("/", getPurchaseRequestsRouter);
app.use("/", processPurchaseRequestRouter)
app.use("/", getUserPropertiesRouter)
app.use("/", getPropertyRouter)


//await Moralis.start({process.env.MORALIS_SERVER_URL, process.env.MORALIS_})
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

module.exports = app;
