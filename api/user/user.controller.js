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

exports.listDai = function (req, res, next) {
  console.log(req.body);
  User.find({role:"user"},function(err, user) {
    if (err) return validationError(res, err);
    console.log(user);
    res.json(user);
  });
};

exports.delele = function (req, res, next) {
  console.log(req.body)
// console.log("del-->>>"+req.body.id+"  _id:"+req.body._id);
  User.remove(req.params.id,function(err, user) {
    if (err) return validationError(res, err);
    console.log(user);
    res.json(200);
  });
};

// Get a single user
exports.show = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return validationError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    return res.json(user);
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {

  if(req.body._id) { delete req.body._id; }
  req.body.updateAt = new Date();


 var obj = JSON.stringify(req.body);
 console.log('EDit+====', obj);
  User.findById(req.params.id, function (err, user) {
   if (err) { return validationError(res, err); }
   if(!user) { return res.status(404).send('Not Found'); }
   var updated = _.merge(user, req.body);
   console.log('-----1------', updated);

   User.update({_id:updated._id},updated, function(err) {
     if (err) { return validationError(res, err); }
     console.log("======save======="+user);
     return res.status(200).json(user);
   });
 });


};

// Deletes a user from the DB.
exports.destroy = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return validationError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    user.remove(function(err) {
      if(err) { return validationError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};


exports.test = function (req, res) {
  res.json('user');
}

exports.updateUser = function (req, res) {
  // User.findById(req.params.id,
  res.json('user');
}
