'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var designsSchema = new Schema({
  companyName: String,
  shopId: { type: Schema.Types.ObjectId, ref: 'shop'}, // 申请流程对象id
  designId: { type: Schema.Types.ObjectId, ref: 'shop'} //设计公司id

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
