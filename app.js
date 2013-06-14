
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.use(express.favicon());
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
//在终端显示简单的不同颜色的日志
app.use(express.logger('dev'));
//用来解析请求体
app.use(express.bodyParser());
//connect 内建的中间件，可以协助处理 POST 请求，伪装 PUT、DELETE 和其他 HTTP 方法
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  //开发环境下的错误处理，输出错误信息
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/about', function(req, res){
	res.send('THIS IS ABOUT PAGE');
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
