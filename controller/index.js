var express = require('express')
var router = express.Router()

var log4js = require('log4js'); 
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(__dirname+'/../logs/application.logs'), 'index.js');
var logger = log4js.getLogger('index.js');

var path = require('path');
var appDir = path.dirname(require.main.filename);

router.use('/movie/', require('./route'))

router.get('/', function(req, res) {
	logger.info("Sucessfully returned the home page");
  	res.sendFile(appDir+'/view/index.html');
});

module.exports = router