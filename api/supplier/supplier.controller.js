'use strict';

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
  console.log(req.body)

  var newSupplier = new Supplier(req.body);

  newSupplier.save(function(err, supplier) {
    if (err) return validationError(res, err);
    console.log(">>"+supplier);

    res.json(200);
  });
};
