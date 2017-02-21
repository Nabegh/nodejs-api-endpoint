var express = require('express');
var request = require('request');

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.get('/*', function(req, res) {


    // Creating an object for URL handling
    var URL = {
      isURL: /^(ftp|http|https):\/\/[^ "]+$/.test(req.url.slice(14)),
      URL: req.url.slice(14),
      HTML: null,
      status: false
    };


  if(URL.isURL){

      request(URL.URL, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              URL.HTML = body;
              URL.status = true;
              res.render('pages/index', {result: URL});
          }

      });

  }
  else {
    var err = new Error("Not found!");
    err.status = 404;
    next(err);
  }


});

app.use(express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {

  if(err.status === 404){
      res.render('pages/404');
  }
  else {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: {}
      });
  }

});

app.listen(8080);
console.log('8080 is the magic port');