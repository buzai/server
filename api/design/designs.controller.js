'use strict';
var muilterUtil = require('./multerUtil');
var Apply = require('../audit/apply.model');
var Designs = require('./designs.model');
var Shop_des_apply = require('./shop_des_apply.model')
var Shop = require('../shop/shop.model');

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

// shopId  desId  new relation 初步添加设计商
exports.verify = function (req, res) {

  console.log(req.body);
  var relation = new Shop_des_apply(req.body);
  relation.save(function(err,rel){
    console.log('ok');
    console.log(rel);
    console.log(req.body.shopId);
    Shop.findById(req.body.shopId, function(err,shop){
      // console.log(shop);
      shop.Shop_des_apply =  rel._id;
      shop.save(function(err){
        res.json(rel)
      })
    })

  })
}


exports.getShopsInit = function (req, res) {
  console.log('getShopsInit');
  Shop_des_apply
  .find({})
  .populate('shopId')
  .populate('designId')
  .populate('shopApplyUserId')
  .exec(function (err, shops) {
    // console.log(shops);
    res.status('200').json(shops)
  })
}


exports.stepVerify = function (req, res) {

  console.log(req.body);

  Shop_des_apply
  .findById(req.body.Shop_des_applyId,function (err, rel) {
    console.log(rel);
    rel.isTiJiaoChuGao = true;
    rel.save(function(err,newrel){


      if(err){console.log(err)}

      Shop.findById(req.body.shopId, function(err,shop){
        // console.log(shop);
        shop.isTiJiaoChuGao =  true;
        shop.save(function(err){
          res.json(newrel)
        })
      })


    })
  })



  // res.json('stepVerify')
  // var relation = new Shop_des_apply(req.body);
  // relation.save(function(rel){
  //   console.log('ok');
  //   res.json(rel)
  // })
}

// Shop.findById(req.body.shopId, function(shop){
//   shop.
// })
// res.json(shops)
//
// Shop
// .find( query )
// .populate('applyId')
// .populate('shopApplyUserId')
// .exec(function (err, shop) {
//   console.log(shop);
//   if(err) { return handleError(res, shop); }
//   res.status(200).json(shop);
// });
