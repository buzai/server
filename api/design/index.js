'use strict';

var express = require('express');
var controller = require('./designs.controller');
// var auth = require('../../auth/auth.service');
var Designs = require('./designs.model');


Designs.find({},function (err,des) {
  console.log(des);
  if(des===null){

    var _des = {
      companyName:"天蓝设计商"
    }
    var newdes = new Designs(_des);

    newdes.save(function(err, data){
      if(err) console.log(err);
      console.log(data);
    })

  }
})


var router = express.Router();

router.get('/', controller.test);
router.get('/designs', controller.designs);



module.exports = router;
