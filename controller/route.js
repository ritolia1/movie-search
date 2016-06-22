var express = require('express')
var request = require('request');
var router = express.Router()
var config=require('../config/config');

var log4js = require('log4js'); 
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(__dirname+'/../logs/application.logs'), 'route.js');
var logger = log4js.getLogger('route.js');

//To list all movies of a particular year based on page no.
router.get('/list/:year/:page', function(req, res) {
  console.log(req.params.year);
  request('http://api.themoviedb.org/3/discover/movie?primary_release_year='+req.params.year+'&page='+req.params.page+'&api_key='+config.api_key, function(error, response, body){
  	if(!error) {
      logger.info("Sucessfully returned the list of movies of year: "+req.params.year+" and page number:"+req.params.page);
      res.json(body);
    }
  	else{
      logger.error("Error while making the request of year: "+req.params.year+" and page number: "+req.params.page);
    }
  });
});

//T list details of specific movie based on movie name.
router.get('/specific/:name', function(req, res) {
  request('http://api.themoviedb.org/3/search/movie?query='+req.params.name+'&api_key='+config.api_key, function(error, response, body){
  	if(!error){
       logger.info("Sucessfully returned the movies detail of : "+req.params.name);
  		res.json(body);
    }
  	else{
      logger.error("Error while making the request of movie: "+req.params.name);
    }
  });
});

//List imdb details for specific movie.
router.get('/imdb/:name',function(req,res){
	request('http://www.omdbapi.com/?t='+req.params.name+'&y=&plot=short&r=json',function(error,response,body){
		if(!error){
      logger.info("Sucessfully returned the movies detail from imdb api of : "+req.params.name);
			res.json(body);
    }
		else{
			logger.error("Error while making the request from imdb api of movie: "+req.params.name);
    }
	})
})


module.exports = router