'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applySchema = new Schema({
  applyUser: { type: Schema.Types.ObjectId, ref:'shop'} // 审核模型对应的4s店 待补充
});


module.exports = mongoose.model('apply', applySchema);
