var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var Beer = require('../models/beer');





var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

router.use(myLogger);

router.get('/', function (req, res) {
  Beer.find( function (err, beers){
    if (err) return console.error(err);
    res.render('beerlist', { title: 'Oluet', beers: beers })
  });
})

router.post('/', function (req, res) {
  var newBeer = new Beer(req.body);
  newBeer.date = Date.now();
  newBeer.save(function (err, newBeer){
    if (err) console.log(err.errors.name.toString());
  });
  res.send("POST beers!");
})

module.exports = router;
