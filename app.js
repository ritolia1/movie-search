var express = require("express");
var app = express();
var router = express.Router();

var config=require('./config/config');

var log4js = require('log4js'); 
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(__dirname+'/logs/application.logs'), 'app.js');
var logger = log4js.getLogger('app.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(require('./controller/'));
app.use(express.static(__dirname + '/public'));
app.listen(config.port);

logger.info("Listening to port "+config.port);

