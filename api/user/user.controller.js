'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

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
    console.log("--->>>"+user)

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


exports.listGong = function (req, res, next) {
  console.log(req.body);

  // var newSupplier = new Supplier(req.body);

  User.find({role:"gonguser"},function(err, supplier) {
    if (err) return validationError(res, err);
    console.log(supplier);
    res.json(supplier);
  });
};
exports.delele = function (req, res, next) {
  console.log(req.body)

  // var newSupplier = new Supplier(req.body);
console.log("del-->>>"+req.body.id+"  _id:"+req.body._id);
  User.remove(req.params.id,function(err, user) {
    if (err) return validationError(res, err);
    console.log(user);
    res.json(200);
  });
};

// Get a single user
exports.show = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    return res.json(user);
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  req.body.uid = req.user.email; // id change on every login hence email is used
  req.body.updated = Date.now();

  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(user);
    });
  });
};

exports.test = function (req, res) {
  res.json('user');
}
