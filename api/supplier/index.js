'use strict';

var express = require('express');
var controller = require('./supplier.controller');


// var auth = require('../../auth/auth.service');

var router = express.Router();


router.get('/', controller.list);
router.post('/', controller.create);


module.exports = router;
