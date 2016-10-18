'use strict';

var Apply = require('./apply.model');
var Shop = require('../shop/shop.model');
var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 */
exports.test = function (req, res) {
  res.json('audit');
}

exports.getApplyById = function (req, res) {
  // IDEA:
  Apply.findById(req.query.id, function (err, apply) {
    res.json(apply);
  })
}

exports.verifyDataSubmitting = function (req, res) {

    req.body.verify = [{
      step:1,
      bool:true,
      verifyDataSubmitting:'资料已提交'
    }];


    var newApply = new Apply(req.body)


    newApply.save(function(err, apply) {

      if (err) console.log(err);
        console.log('-----------------------------')

      console.log(apply);
              console.log('-----------------------------')

      console.log(req.body.shopId)
      Shop.findById(req.body.shopId, function (err, shop) {
        shop.applyId = apply._id;
        shop.verifyDataSubmitting = true;
        shop.save(function (err) {
        if (err) console.log(err);
        console.log('-----------------------------')
        console.log(apply)
          return res.status(200).json(apply);
        });
      })

    });
  // req.body.verify = [{
  //   step:1,
  //   info:'资料已提交'
  // }]

  // var verStep = {
  //   userId : userId,
  //   userName : name,
  // }

  // Apply.findByIdAndUpdate(
  // req.body.applyId,
  // {$push: { "verify": verStep },
  // {safe: true, upsert: true, new : true},
  // function(err, instance) {
  //   if (err) {
  //     cb(err);
  //   }
  //   console.log(instance)
  //   res.json(instance);
  //   }
  // );  notverify : Boolean


}

exports.stepVerify = function (req, res) {

  console.log(req.body)

  if(!req.body.verify.bool){
    console.log('notverify')
      Shop.findById(req.body.shopId, function (err, shop) {
        shop.notverify = true;
        shop.save(function (err) {
        if (err) console.log(err);
        });
      })
  }
  if(req.body.isVerify){
    console.log('isVerify')
      Shop.findById(req.body.shopId, function (err, shop) {
        shop.isVerify = true;
        shop.save(function (err) {
        if (err) console.log(err);
        });
      })
  }
  Apply.findByIdAndUpdate(
  req.body.applyId,
  {$push: { verify: req.body.verify }},
  {safe: true, upsert: true, new : true},
  function(err, instance) {
    if (err) console.log(err);
    console.log(instance)
    res.json('ok');
    }
  );

}
