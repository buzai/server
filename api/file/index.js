'use strict';

var express = require('express');
var controller = require('./file.controller');
// var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.test);

router.post('/updateFile', controller.updateFile)




module.exports = router;
