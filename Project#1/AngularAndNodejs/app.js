var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

//서버와 통신을 주고 받을 Js파일을 지정해줍시다.
var rest_api = require('./routes/rest_api');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);



//라우팅은 URI(또는 경로) 및 특정한 HTTP 요청 메소드(GET, POST 등)인 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 응답하는 방법을 결정하는 것을 말합니다.
//app.METHOD(PATH, HANDLER)
//app은 express의 인스턴스입니다.
//METHOD는 HTTP 요청 메소드입니다.
//PATH는 서버에서의 경로입니다.
//HANDLER는 라우트가 일치할 때 실행되는 함수입니다.

//req = require Frontend에서 필요한 요청을 Backend에 전달하기 위한 변수
//res = responce Backend에서 처리한 Frontend의 요청에 답하기 위한 변수
app.all('/api/add', function (req, res, next) {
  console.log('Add API is called...');
  //
  api = new rest_api(); 
  result = api.write(req);
  if (result) {
    res.json({success: true})
  }
});

app.all('/api/list', function (req, res, next) {
  console.log('List API is called...');
  api = new rest_api();
  api.list(req, res);
});

//페이지 에러에 대한 옵션들
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
