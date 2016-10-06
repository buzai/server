'use strict';

var Apply = require('../apply/apply.model');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 */
exports.test = function (req, res) {
  res.json('audit');
}

exports.verify = function (req, res) {

  req.body.verify = [{
    step:1,
    info:'资料已提交'
  }]

}