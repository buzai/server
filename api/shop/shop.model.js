'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shopSchema = new Schema({
  name: String,
  applyId: { type: Schema.Types.ObjectId, ref: 'apply'}, // 申请流程对象id
  shopApplyUserId: { type: Schema.Types.ObjectId, ref: 'User'}, // 申请入网人的id

});


module.exports = mongoose.model('shop', shopSchema);
