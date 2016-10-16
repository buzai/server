'use strict';
var muilterUtil = require('./multerUtil');
var Apply = require('../audit/apply.model');
var Designs = require('./designs.model');


var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * test
 */
exports.test = function (req, res) {
  res.json('shop');
}
/**
 * create shop
 */
exports.designs = function (req, res) {

  Designs.find(function (err,des) {
    console.log(des);
    res.json(des);
  })
};
