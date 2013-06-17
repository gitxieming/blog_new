
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , MongoStore = require('connect-mongo')(express)
  , settings = require('./settings')
  , flase = require('connect-flash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(flase());
// app.use(express.favicon());
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
//在终端显示简单的不同颜色的日志
app.use(express.logger('dev'));
//用来解析请求体
app.use(express.bodyParser());
//connect 内建的中间件，可以协助处理 POST 请求，伪装 PUT、DELETE 和其他 HTTP 方法
app.use(express.methodOverride());
//cookie解析的中间件
app.use(express.cookieParser());
//提供会话功能
app.use(express.session({
	secret: settings.cookieSecret,//防止篡改cookie
	key: settings.db,
	cookie: {maxAge: 1000*60*60*24*30}, //cookie生存期 30 days
	store: new MongoStore({
		db: settings.db //把会话存到数据库中
	})
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  //开发环境下的错误处理，输出错误信息
  app.use(express.errorHandler());
}


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

routes(app);
