var express = require('express');


var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/url/*', function(req, res) {

  function urlHandler(url) {
      return /^(ftp|http|https):\/\/[^ "]+$/.test(url.slice(5));
  }

  if(urlHandler(req.url)){
    console.log("it's url!");
  }
  else {
    var err = new Error("Not found!");
    err.status = 404;
    next(err);
  }

    res.render('pages/index');
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