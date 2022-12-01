var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy; 
passport.use(new LocalStrategy(function(username, password, done) { 
  Account.findOne({ username: username }, function (err, user) { 
    if (err) { return done(err); } 
    if (!user) { 
      return done(null, false, { message: 'Incorrect username.' }); 
    } 
    if (!user.validPassword(password)) { 
      return done(null, false, { message: 'Incorrect password.' }); 
    } 
    return done(null, user); 
  }); 
})); 
var football = require("./models/football");



require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{     
  useNewUrlParser: true,
   useUnifiedTopology: true
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var FootballRouter = require('./routes/football');
var gridbuildRouter = require('./routes/gridbuild');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ 
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: false 
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gridbuild', gridbuildRouter);
app.use('/Football', FootballRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);
// passport config 
// Use the existing connection 
// The Account model  
var Account =require('./models/account'); 
 
passport.use(new LocalStrategy(Account.authenticate())); 
passport.serializeUser(Account.serializeUser()); 
passport.deserializeUser(Account.deserializeUser()); 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// passport config 
// Use the existing connection 
// The Account model  
var Account =require('./models/account');  
passport.use(new LocalStrategy(Account.authenticate())); 
passport.serializeUser(Account.serializeUser()); 
passport.deserializeUser(Account.deserializeUser()); 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function recreateDB(){
 // Delete everything
 console.log("test");
 await football.deleteMany();
 console.log("delete")
 let instance1 = new football({football_name:'Cosco' ,football_type:"leather",football_size:25});
 instance1.save( function(err,doc) {
 if(err) return console.error(err);
 console.log("First object saved")
 });

 let instance2 = new
football({football_type:"rubber", football_name:'nivia',
football_size:26});
 instance2.save( function(err,doc) {
 if(err) return console.error(err);
 console.log("second object saved")
 });
 let instance3= new
football({football_type:"sythetic", football_name:'puma',
football_size:27});
 instance3.save( function(err,doc) {
 if(err) return console.error(err);
 console.log("third object saved")
 });
}
let reseed = true;
if (reseed) { recreateDB();}

module.exports = app;