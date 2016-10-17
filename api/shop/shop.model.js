'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');   //自增ID 模块
    autoIncrement.initialize(mongoose.connection);
var shopSchema = new Schema({
  companyName: String,
  carBrand: String,
  nature: String,
  establishDate: String,
  registerCapital: String,
  shopNumber: String,
  sellSuffer: String,
  afterSale: String,
  applyId: { type: Schema.Types.ObjectId, ref: 'apply'}, // 申请流程对象id
  shopApplyUserId: { type: Schema.Types.ObjectId, ref: 'User'}, // 申请入网人的id
  designsShopRelation: { type: Schema.Types.ObjectId, ref: 'designsShopRelation'}, // 审核关系id
  isVerify : Boolean,//是否完全审核完成
  wait_to_cheack: Boolean,//第一步是否审核
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
  keyUsers:[{}],
  carSalesTable:[{}],
  nocarSalesTable:[{}],
  repairStatusTable:[{}],
  financeStatusTable:[{}],
  notverify : Boolean, //某个步骤被拒绝



  basic:{},
  SharesConstitute:[{}],
  users:[{}],
  carShareholder:[{}],
  notcarShareholder:[{}],
  maintenance:[{}],
  CSmessage:{},
  bss:{},
  BSbusinessArea:[{}],
  BSSdatum:{},
  newCP:{},
  funding:{},
  StoreConstructionPlan:[{}],
  keyJob:[{}],
  SchemaArrange:{},
  MFAform:{},

  isTiJiaoChuGao:Boolean,
  Shop_des_apply:  { type: Schema.Types.ObjectId, ref: 'designsShopRelation'} //关联

});
shopSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

shopSchema.plugin(autoIncrement.plugin, {               //自增ID配置
  model: 'shop',
  field: 'shopId',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('shop', shopSchema);
