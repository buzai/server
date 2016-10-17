'use strict';
var muilterUtil = require('./multerUtil');
var Apply = require('../audit/apply.model');
var Designs = require('./designs.model');
var Shop_des_apply = require('./shop_des_apply.model')

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

// shopId  desId  new relation
exports.verify = function (req, res) {

  console.log(req.body);
  res.json('ok')
  // var relation = new shop_des_apply(req.body);
  // relation.save(function(rel){
  //   res.json(rel)
  // })
}
