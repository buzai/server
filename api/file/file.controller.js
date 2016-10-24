'use strict';
var muilterUtil = require('./multerUtil');
var _ = require('lodash');
var async = require('async');



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

exports.updateFile = function (req, res) {


  var upload=muilterUtil.any();
  // console.log(req.headers);

  upload(req, res, function (err) {
    if (err) {
      return console.log(err)
    }
    console.log(req.body);
    return res.status(200).json(req.files[0].filename);

    // console.log(req.files)

    // res.json('shop');
  })


}
















//{"applyId":{"$exists":"true"}} 没有审核过的和进行到哪一步的可以继续进行的
