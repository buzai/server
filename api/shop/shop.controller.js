'use strict';

var Apply = require('./shop.model');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 */
exports.test = function (req, res) {
  res.json('shop');
}

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
