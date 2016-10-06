'use strict';

var express = require('express');
var controller = require('./audit.controller');
// var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.test);
router.post('/', controller.verify);



module.exports = router;