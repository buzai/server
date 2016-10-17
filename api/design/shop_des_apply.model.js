'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var designsSchema = new Schema({
  shopId: { type: Schema.Types.ObjectId, ref: 'shop'}, // 申请流程对象id
  designId: { type: Schema.Types.ObjectId, ref: 'designs'}, //设计公司id
  vertify:[{}],
  content:String,
  shopApplyUserId: { type: Schema.Types.ObjectId, ref: 'User'}, // 申请入网人的id
  meta: {
      createAt: {
          type: Date,
          default: Date.now()
      },
      updateAt: {
          type: Date,
          default: Date.now()
      }
  },
  isTiJiaoChuGao:Boolean
});
designsSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});


module.exports = mongoose.model('designsShopRelation', designsSchema);
