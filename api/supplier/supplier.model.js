'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SupplierSchema = new Schema({
  name: String,
  password: {type: String, default: '123456'},
  address:String,
  ownName:String,
  phone: String,
  email: { type: String, lowercase: true },
  status: {type: Boolean, default: true},
  hashedPassword: String,
  salt: String,
  createAt: {type: Date,default: Date.now()},
  updateAt: {type: Date,default: Date.now()}
});



module.exports = mongoose.model('Supplier', SupplierSchema);
