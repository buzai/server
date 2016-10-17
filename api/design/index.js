'use strict';

var express = require('express');
var controller = require('./designs.controller');
// var auth = require('../../auth/auth.service');
var Designs = require('./designs.model');


Designs.find({},function (err,des) {
  // console.log(des);
  if(des===null){

    var _des = {
      companyName:"天海设计商"
    }
    var newdes = new Designs(_des);

    newdes.save(function(err, data){
      if(err) console.log(err);
      console.log(data);
    })

    var _des1 = {
      companyName:"天空设计商"
    }
    var newdes1 = new Designs(_des1);

    newdes1.save(function(err, data){
      if(err) console.log(err);
      console.log(data);
    })

    var _des2 = {
      companyName:"海天设计商"
    }
    var newdes2 = new Designs(_des2);

    newdes2.save(function(err, data){
      if(err) console.log(err);
      console.log(data);
    })

  }
})


var router = express.Router();

// router.get('/', controller.test);
router.get('/', controller.designs);
router.post('/verify', controller.verify);
router.get('/getShopsInit', controller.getShopsInit);
router.post('/stepVerify', controller.stepVerify);

module.exports = router;
