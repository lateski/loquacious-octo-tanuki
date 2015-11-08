var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var beerSchema = new Schema({
  name    : {type : String, required: '{PATH} is required!' }    ,
  brewery : {type : String, required: '{PATH} is required!' }    ,
  abv     : {type : String, required: '{PATH} is required!' }    ,
  beertype: {type : String, required: '{PATH} is required!' }    ,
  date    : { type : Date, default : Date.now },
  reviews : [{ name : String, comment : String, reviewdate : {type : Date, default : Date.now}}]
});

beerSchema.methods.findSimilarBeers = function (cb) {
  return this.model('Beer').find({ type: this.type }, cb);
}

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
