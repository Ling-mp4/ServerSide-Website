//various modules and dependencies needed for the app are imported.
var createError = require('http-errors'); //Used for generating HTTP errors (like 404, 500 errors).
var express = require('express'); //express module providing the skeleton and routing
var path = require('path'); //path core module, used for different operations on path/directories
var cookieParser = require('cookie-parser');//used for cookies handling; not used at the moment. we could use it for authentication
var logger = require('morgan');//Middleware for logging HTTP requests

const mongoose = require('mongoose');


//////////////////////////////////////////////////////

// The routes defined in the routes directory are imported here to link them with different endpoints.
var indexRouter = require('./routes/index'); // Here we define the routes
var usersRouter = require('./routes/users');
var bookRouter = require('./routes/book.js');
var aboutRouter = require('./routes/about');
var helpRouter = require('./routes/help');
var accountRouter = require('./routes/account');
var reportRouter = require('./routes/report');

/////////////////////////////////////////////////

var app = express(); //creating an instance of express module

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

///////////////////////////////////////////////////

// Setting up middleware functions, which process incoming requests before routing them to their final destination. These are functions that modify the request and response objects.
app.use(logger('dev')); //Logs details about each request (HTTP method, response status, time, etc.)
app.use(express.json());//Automatically parses JSON payloads in request bodies.
app.use(express.urlencoded({ extended: false }));//Parses URL-encoded data
app.use(cookieParser());//parse cookies in incoming requests
app.use(express.static(path.join(__dirname, 'public')));//Serves static assets

///////////////////////////////////

//Route Handling: This section links the imported route modules to specific URL paths.

app.use('/', indexRouter); //index router at homepage i.e., localhost:3000
app.use('/users', usersRouter);//users router at localhost:3000/users
app.use('/book', bookRouter);//book router at localhost:3000/book
app.use('/about', aboutRouter);//about router at localhost:3000/about
app.use('/help', helpRouter);//help router at localhost:3000/help
app.use('/account', accountRouter);//account router at localhost:3000/account
app.use('/report', reportRouter);
//////////////////////////////////

// const url = "mongodb+srv://arthurryskulov:pr10YhxyVxObNw69@cluster0.ef4bc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const url = "mongodb://localhost:27017";
const connect = mongoose.connect(url);


connect.then(() => {
  console.log("Connected correctly to server");
})
.catch(err => {
  console.error('Connection error:', err);
});

///Eror Handling /////////////////
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
/////object is exported so that it can be used in other files, especially in the server startup script www
module.exports = app;
