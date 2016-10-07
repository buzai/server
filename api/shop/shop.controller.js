'use strict';
var muilterUtil = require('./multerUtil');
var Apply = require('./shop.model');

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
exports.create = function (req, res) {

  console.log(req.body)

  newApply = new Apply(req.body)
  newApply.verify = [{
    step:1,
    info:'资料已提交'
  }];
  newApply.save(function(err, apply) {
    if (err) return validationError(res, err);
    res.json(apply);
  });
};
/**
 * 
 */

exports.baseinfo = function (req, res) {


  var upload=muilterUtil.any();
  // console.log(req.headers);

  upload(req, res, function (err) {
    if (err) {
      return console.log(err)
    }
    console.log(req.body);
    // return res.status(200).json(req.files[0].filename);
    // console.log(req);
    res.json('shop');
  })

  // res.json('shop');

}
