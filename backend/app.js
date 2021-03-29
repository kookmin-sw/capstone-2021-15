var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const config = require("./config/key");

var mongoose = require('mongoose');
var MONGODB_URI = config.mongoURI;
mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true, 
  useNewUrlParser:true, 
  useCreateIndex: true, 
  useFindAndModify: true 
  }, function(err, db){
  console.log('db connect');
})


var userRouter = require('./routes/user');
var productRouter = require('./routes/product');
// var likeRouter = require('./routes/like');

var app = express();
app.set('view engine', 'pug');
app.use(logger('dev')); // 개발 시는 dev
// app.user(logger('combined'));
app.use(express.json()); // body-parser가 express에 속함 -> req.body.name
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // cookie를 파싱
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user/', userRouter);
app.use('/api/product/', productRouter);
// app.use('/like', likeRouter);
app.use((req, res, next) => {
  res.status(404).send('not found');
});

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
  res.json('error');
});

module.exports = app;
