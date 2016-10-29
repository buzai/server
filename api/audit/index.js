'use strict';

var express = require('express');
var controller = require('./audit.controller');
// var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.test);
// 提交信息，创建验证对象
router.post('/verifyDataSubmitting', controller.verifyDataSubmitting);
router.post('/reVerifyDataSub', controller.reVerifyDataSub);
// 分步骤验证
router.post('/stepVerify', controller.stepVerify);



router.get('/getApplyById', controller.getApplyById);

// 获取审核未通过企业
// 通知企业
module.exports = router;
