var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var Beer = require('../models/beer');





var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

router.use(myLogger);

router.param('beer', function(req, res,  next, id){
  Beer.find({'name': id }, function(err, beer){
    if(err) {
      next(err);
    } else if (beer) {
      req.beer = beer[0];
      next();
    } else {
      next(new Error('Failed to find BEER!'));
    }
  });
});

router.get('/:beer', function(req, res){
  console.log(req.beer)
  res.render('beer', {beer : req.beer})
});

router.get('/', function (req, res) {
  Beer.find( function (err, beers){
    if (err) return console.error(err);
    res.render('beerlist', { title: 'Oluet', beers: beers })
  });
});

router.post('/', function (req, res) {
  var newBeer;
  console.log(req.body);
  newBeer = new Beer(req.body);

  newBeer.date = Date.now();
  newBeer.save(function (err, newBeer){
    if (err) console.log(err.errors);
  });
  Beer.find(function (err, beers){
    if (err) return console.error(err);
    res.render('beerlist', { title: 'Oluet', beers: beers })
  });
});

module.exports = router;
