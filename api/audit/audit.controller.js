'use strict';

var Apply = require('./apply.model');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 */
exports.test = function (req, res) {
  res.json('audit');
}

exports.verify = function (req, res) {


}