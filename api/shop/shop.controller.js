'use strict';
var muilterUtil = require('./multerUtil');
var Apply = require('../audit/apply.model');
var Shop = require('./shop.model');


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
    console.log(req.query.id)


    Shop.find({shopApplyUserId:req.query.id},function(err, shop){
      console.log(shop[0])
      res.json(shop[0]);
    })


}

exports.baseinfo = function (req, res) {

  
  Shop.find({shopApplyUserId:req.body.shopApplyUserId},function(err, shop){
    if (err) return validationError(res, err);

    console.log(shop[0])
    

    if(shop[0]) {
      res.json(shop[0]);
    }
  }
  
  )

  console.log(req.body)
  req.body.isVerify = false;
  req.body.wait_to_cheack = true;
  var newShop = new Shop(req.body)
  newShop.save(function(err, shop) {
    if (err) return validationError(res, err);
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

//{"applyId":{"$exists":"true"}} 没有审核过的和进行到哪一步的可以继续进行的
exports.getNotVerifyShops = function (req, res) {
  console.log(typeof(req.query.notverify))

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
      // console.log(shop)
      res.status(200).json(shop);
    });
}

exports.getShopByQuery = function (req, res) {
  
    console.log(req.query)
    var query = req.query;
    if(query.isVerify==='true'){
     query = { isVerify : true, applyId:{$exists:true}, notverify:{ $exists:false } }
    }
    console.log(query)
    Shop
    .find( query )
    .populate('applyId')  
    .populate('shopApplyUserId')  
    .exec(function (err, shop) {
      if(err) { return handleError(res, shop); }
      res.status(200).json(shop);
    });
}


exports.keyUsers = function (req, res) {

  console.log(req.body)

  var ziduan = req.body.ziduan;
     
 if(ziduan==='keyUsers'){
    Shop.findByIdAndUpdate(
    req.body.applyId,
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
    req.body.applyId,
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
    req.body.applyId,
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
    req.body.applyId,
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
    req.body.applyId,
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

