'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applySchema = new Schema({
  name: String,
  applyUser: { type: Schema.Types.ObjectId, ref: 'User'}, // seller
  address:[{}],
  describe: String,
  class: String,
  verify:[{}],
  phone: String,
  cellphone: String
});


module.exports = mongoose.model('apply', applySchema);
