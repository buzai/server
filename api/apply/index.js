'use strict';

var express = require('express');
var controller = require('./apply.controller');
// var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.test);
router.post('/', controller.create);



module.exports = router;