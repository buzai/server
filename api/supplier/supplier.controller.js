'use strict';

var crypto = require('crypto');
var Supplier = require('./supplier.model');






var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Creates a new Supplier
 */
exports.list = function (req, res, next) {
  console.log(req.body)

  var newSupplier = new Supplier(req.body);

  Supplier.find({},function(err, supplier) {
    if (err) return validationError(res, err);
    console.log(supplier);
    res.json(supplier);
  });
};

exports.create = function (req, res, next) {
  console.log(req.body);
  //生成口令的散列值
  if(req.body.password==='undefined'||req.body.password === null||req.body.password === ""){
    req.body.password='123456';
    // console.log("=============");
  }
  var md5 = crypto.createHash('md5');
  req.body.password = md5.update(req.body.password).digest('base64');


  // console.log("Password:"+req.body);
  var newSupplier = new Supplier(req.body);
  newSupplier.save(function(err, supplier) {
    if (err) return validationError(res, err);
    console.log(">>"+supplier);
    res.json(200);
  });
};


exports.delete = function (req, res, next) {
  console.log(req.body)

  // var newSupplier = new Supplier(req.body);

  Supplier.remove({_id:req.body._id},function(err, supplier) {
    if (err) return validationError(res, err);
    console.log(supplier);
    res.json(200);
  });
};
