var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Beer = require('../models/beer');



router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});


// Parameter for single beer currently takes urlencoded values and trys to find them from database
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

router.use('/:beer/delete',function (req, res, next){
  next();
})

router.get('/:beer/delete', function (req, res, next) {
  Beer.findById(req.beer._id, function(err, beer) {
    if(err) {
      next(err);
    } else if (beer) {
      beer.remove(function (err, beer){
        if(err) {
          next(err);
        }
      })
    }
  });

  res.redirect('/')//res.send('Haluat siis poistaa oluen ! '+ req.beer.name);
})

router.get('/:beer', function(req, res, next){
  if (req.beer == null) {
    res.status(404);
    var beerNotFound = new Error("Beer not found");
    beerNotFound.status = 404;
    res.render('error', {message:'Beer was not found :(', error:beerNotFound});
  }
  res.render('beer', {beer : req.beer})
});

//Returns full URL and sets it into req.gsetUrl
router.use(function(req, res, next) {
    req.getUrl = function() {
      //HARDcoded value because req.get('host') does not work when proxying with apache
      return req.protocol + "://olut.keisari.net" + req.originalUrl;
    }
    return next();
});

router.get('/', function (req, res, next) {
  Beer.find( function (err, beers){
    if (err) return console.error(err);
    res.render('beerlist', { title: 'Oluet', beers: beers, currentUrl: req.getUrl() })
  });
});

router.post('/:beer/comment', function (req, res, next){
  Beer.findById(req.beer._id, function(err, beer){
    if(err){
      next(err);
    } else if (beer){
      console.dir(req.body);
      beer.reviews.push({name:req.body.name, comment: req.body.comment, reviewdate: Date.now()});
      beer.save(function (err, newBeer){
        if (err){console.log(err.errors);
          next(err);
        }
      });
      res.render('beer', {beer: beer});
    }
  });
});


router.post('/', function (req, res, next) {
  var newBeer;
  console.log(req.body);
  newBeer = new Beer(req.body);

  newBeer.date = Date.now();
  newBeer.save(function (err, newBeer){
    if (err) console.log(err.errors);
  });
  Beer.find(function (err, beers){
    if (err) next(err);
    res.render('beerlist', { title: 'Oluet', beers: beers })
  });
});

module.exports = router;
