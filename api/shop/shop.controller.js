'use strict';
var muilterUtil = require('./multerUtil');
var Apply = require('../audit/apply.model');
var Shop = require('./shop.model');
var _ = require('lodash');
var async = require('async');



var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * test
 */
exports.test = function (req, res) {
  res.json('shop');
}
/**
 * create shop
 */
exports.create = function (req, res) {

  // console.log(req.body)

  // newApply = new Apply(req.body)
  // newApply.verify = [{
  //   step:1,
  //   info:'资料已提交'
  // }];
  // newApply.save(function(err, apply) {
  //   if (err) return validationError(res, err);
  //   res.json(apply);
  // });
};
/**
 * getShopsById
 */
exports.getShopsById = function (req, res) {
    console.log(req.query.id)


    Shop.findById(req.query.id,function(err, shop){
      console.log(shop)
      res.json(shop);
    })


}

exports.getShopsByuserId = function (req, res) {

    console.log('getShopsByuserId')
    console.log(req.query.id)


    Shop

    .find({shopApplyUserId:req.query.id})

	.populate('applyId')
	.exec(

	  function(err, shop){
	      res.json(shop[0]);
	  }
	)



}

exports.baseinfo = function (req, res) {
  console.log('1================================================~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

  console.log(req.body);
  // Shop.find({shopApplyUserId:req.body.shopApplyUserId},function(err, shop){
  //   if (err) return validationError(res, err);
  //
  //   console.log(shop[0])
  //
  //
  //   if(shop[0]) {
  //     res.json(shop[0]);
  //   }
  // }
  //
  // )
  console.log('2~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(req.body)
  req.body.isVerify = false;
  req.body.wait_to_cheack = true;
  var newShop = new Shop(req.body)
  newShop.save(function(err, shop) {
    if (err) return validationError(res, err);
    console.log('3~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

    console.log(shop)
    res.json(shop);
  });

  // var upload=muilterUtil.any();
  // // console.log(req.headers);

  // upload(req, res, function (err) {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   console.log(req.body);
  //   // return res.status(200).json(req.files[0].filename);

  //   console.log(req.files)

  //   res.json('shop');
  // })

  // res.json('shop');

}




exports.updateBaseinfo = function (req, res) {

  console.log(req.body.shopId);

  Shop.findById(req.body.shopId, function (err, shop) {
    console.log('findshop');
    if (err) { console.log(err); }
    if(!shop) { console.log('notfind'); }

    var updated = _.merge(shop, req.body.baseinfo);

    updated.markModified('MFAform');
    updated.markModified('SchemaArrange');
    updated.markModified('keyJob');
    updated.markModified('StoreConstructionPlan');
    updated.markModified('fundings');
    updated.markModified('newCP');
    updated.markModified('BSSdatum');
    updated.markModified('BSbusinessArea');
    updated.markModified('bss');
    updated.markModified('CSmessage');
    updated.markModified('maintenance');
    updated.markModified('notcarShareholder');
    updated.markModified('carShareholder');
    updated.markModified('users');
    updated.markModified('SharesConstitute');
    updated.markModified('basic');
    updated.markModified('notverify');
    updated.markModified('financeStatusTable');
    updated.markModified('repairStatusTable');
    updated.markModified('nocarSalesTable');
    updated.markModified('carSalesTable');
    updated.markModified('keyUsers');
    updated.markModified('newEquityStructure');
    updated.markModified('nowBankDeposit');
    updated.markModified('jzcfhxFile');
    updated.markModified('tdzFile');
    updated.markModified('gjdFile');
    updated.markModified('cdwbnbFile');
    updated.markModified('ztjnbzpFile');
    updated.markModified('njdfjjpwdFile');
    updated.markModified('shwxpwdFile');




    updated.save(function (err,data) {

      if (err) { console.log(err);}

      return res.json(data);

    });
  });

}














//{"applyId":{"$exists":"true"}} 没有审核过的和进行到哪一步的可以继续进行的
exports.getNotVerifyShops = function (req, res) {

  console.log('================================');
  console.log(req.query.notverify)

  var query = false;
  if(req.query.notverify==='false'){
     query = false;
  }else {
     query = true;
  }

    Shop
    .find({ isVerify : false, applyId:{$exists:true}, notverify:{ $exists:query } })
    .populate('applyId')
    .populate('shopApplyUserId')
    .exec(function (err, shop) {
      if(err) { return handleError(res, shop); }
      // if(!product) { return res.status(404).send('Not Found'); }
      // var newproduct = product[0].toObject();
      //       console.log(newproduct)

      // return res.json(newproduct);
      console.log(shop);
      console.log('----------------------------------------');
      res.status(200).json(shop);
    });
}

// async.filter(arr, function(item, callback) {
//     log('1.1 enter: ' + item);
//     setTimeout(function() {
//         log('1.1 test: ' + item);
//         callback(item>=3);
//     }, 200);
// }, function(results) {
//     log('1.1 results: ', results);
// });
exports.getShopByQuery = function (req, res) {

    console.log(req.query)
    var query = req.query;
    // if(query.isVerify==='true'){
    //  query = { isVerify : true, applyId:{$exists:true}, notverify:{ $exists:false } }
    // }


    console.log(query)
    Shop
    .find( query )
    .populate('applyId')
    .populate('shopApplyUserId')
    .populate('Shop_des_apply')
    .exec(function (err, shop) {
      // console.log(shop);
      if(err) { return handleError(res, shop); }
      console.log(shop);
      res.json(shop);
    });
}





exports.getShopByState = function (req, res) {

    var query = req.query;

    console.log('query');
    console.log(query);

    var num = Number(query.num);
    console.log(num);

    query = {verifyDataSubmitting:true};


    console.log(query)
    Shop
    .find( query )
    .populate('applyId')
    .populate('shopApplyUserId')
    .populate('Shop_des_apply')
    .exec(function (err, shop) {
      // console.log(shop);
      if(err) { return handleError(res, shop); }

        // var _shop = shop.toObject()
      async.filter(shop, function (item, cb) {
        cb(null,item.applyId.verify.length === num)
      },
        function (err,newshop) {
          res.json(newshop);
        }
      )

    });
}




exports.keyUsers = function (req, res) {

  console.log(req.body)

  var ziduan = req.body.ziduan;
  var shopId = req.body.shopId;


 if(ziduan==='keyUsers'){
    Shop.findByIdAndUpdate(
    shopId,
    {$push: { keyUsers: req.body.data }},
    {safe: true, upsert: true, new : true},
    function(err, instance) {
      if (err) console.log(err);
      console.log(instance)
      res.json(instance);
      }
    )
 }
 else if(ziduan === 'carSalesTable'){
    Shop.findByIdAndUpdate(
    shopId,
    {$push: { carSalesTable: req.body.data }},
    {safe: true, upsert: true, new : true},
    function(err, instance) {
      if (err) console.log(err);
      console.log(instance)
      res.json(instance);
      }
    )
  }
 else if(ziduan === 'nocarSalesTable'){
    Shop.findByIdAndUpdate(
    shopId,
    {$push: { nocarSalesTable: req.body.data }},
    {safe: true, upsert: true, new : true},
    function(err, instance) {
      if (err) console.log(err);
      console.log(instance)
      res.json(instance);
      }
    )
  }
 else if(ziduan === 'repairStatusTable'){
    Shop.findByIdAndUpdate(
    shopId,
    {$push: { repairStatusTable: req.body.data }},
    {safe: true, upsert: true, new : true},
    function(err, instance) {
      if (err) console.log(err);
      console.log(instance)
      res.json(instance);
      }
    )
  }
 else if(ziduan === 'financeStatusTable'){
    Shop.findByIdAndUpdate(
    shopId,
    {$push: { financeStatusTable: req.body.data }},
    {safe: true, upsert: true, new : true},
    function(err, instance) {
      if (err) console.log(err);
      console.log(instance)
      res.json(instance);
      }
    )
  }

 }
