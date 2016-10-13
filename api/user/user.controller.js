'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  console.log(req.body)

  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    console.log(user)

    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresIn: 18000 });
    console.log(token)
    res.json({token: token,role:user.role});
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  console.log('user-me')
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

exports.test = function (req, res) {
  res.json('user');
}