'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

// var auth = require('../../auth/auth.service');

var router = express.Router();

// router.get('/', auth.hasRole('admin'), controller.index);
// router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
// router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
// router.get('/:id', auth.isAuthenticated(), controller.show);

router.get('/', controller.test);
//注册
router.post('/', controller.create);


// 供应商角色
router.get('/gong', controller.listGong);
router.post('/gong', auth.hasRole('admin'),controller.create);
router.get('/gong/:id', auth.hasRole('admin'),controller.show);
router.post('/gong/:id', auth.hasRole('admin'),controller.update);
router.delete('/gong/:id', auth.hasRole('admin'), controller.destroy);


// router.delete('/gong/:id', auth.hasRole('admin'),controller.delele);
// router.put('/gong/:id', auth.hasRole('admin'), controller.update);

//  代理商角色
router.get('/dai', controller.listDai);
router.get('/dai/:id', controller.show);

router.post('/:id', controller.update);
router.patch('/:id',controller.update);

module.exports = router;
