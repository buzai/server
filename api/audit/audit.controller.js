'use strict';

var Apply = require('./apply.model');
var Shop = require('../shop/shop.model');
var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
  * test 58187f6837b37777de73671c
 */
exports.test = function (req, res) {
  var id  = req.query.id;
  console.log(typeof(id));
  Apply.findById(id,function (err,apply) {
    console.log(apply);
    apply.markModified('verifyHistory');
    apply.markModified('verify');
    var a = apply.verify.slice(0,1)//需要保留的
    var b = apply.verify.slice(1)//存储的历史
    var c = apply.verifyHistory;
    apply.verifyHistory = c.concat( b );
    apply.verify = a;
    apply.save(function (err,newApply) {
      console.log(newApply);
    })





  })


  res.json('audit');
}

exports.getApplyById = function (req, res) {
  // IDEA:
  Apply.findById(req.query.id, function (err, apply) {
    res.json(apply);
  })
}



exports.reVerifyDataSub = function (req,res) {

  Shop.findById(req.body.shopId, function (err, shop) {
    shop.verifyDataSubmitting = true;
    shop.shenheshibaiFlag = false;
    shop.save(function (err) {
    if (err) console.log(err);
    return res.status(200).json(shop);

    })
  })

}

exports.verifyDataSubmitting = function (req, res) {





    req.body.verify = [{
      step:1,
      bool:true,
      verifyDataSubmitting:'资料已提交',
      verifyHistory: [{}]
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
      Shop.findById(req.body.shopId,
         function (err, shop) {
                shop.shenheshibaiFlag = true;
                shop.verifyDataSubmitting = false;
                      shop.save(function (err) {
                        //todo
                        if (err) console.log(err);


                        //更新审核数据
                        Apply.findByIdAndUpdate(
                        req.body.applyId,
                        {$push: { verify: req.body.verify }},
                        {safe: true, upsert: true, new : true},

                        function (err,apply) {
                          console.log(apply);
                          apply.markModified('verifyHistory');
                          apply.markModified('verify');
                          var a = apply.verify.slice(0,1)//需要保留的
                          console.log('aaa');
                          console.log(a);
                          var b = apply.verify.slice(1)//存储的历史
                          console.log('bbb');
                          console.log(b);
                          var c = apply.verifyHistory;
                          console.log('ccc');
                          console.log(c);
                          apply.verifyHistory = c.concat( b );
                          apply.verify = a;
                          apply.save(function (err,newApply) {
                            console.log('~~~~~~');
                            console.log(newApply);
                            res.json('ok');
                          })
                        });
                      })
        }

    );




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

  if (req.body.verify.bool) {
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


}
