'use strict';

var express = require('express');
var controller = require('./shop.controller');
// var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.test);
router.post('/', controller.create);

router.post('/baseinfo', controller.baseinfo)
router.get('/updateBaseinfo', controller.updateBaseinfo)
//获取未审核企业
router.get('/getNotVerifyShops',  controller.getNotVerifyShops);

router.get('/getShopByQuery',  controller.getShopByQuery);

router.post('/keyUsers', controller.keyUsers);

router.get('/getShopsById', controller.getShopsById);

router.get('/getShopsByuserId', controller.getShopsByuserId);


var path = require("path");


module.exports = router;
