/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/api/shops', require('./api/shop'));
  app.use('/api/audits', require('./api/audit'));



  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  // app.route('/*')
  //   .get(function(req, res) {
  //     res.sendFile(path.normalize(__dirname+'/src') + '/index.html');
  //     // res.render('index.html');
  //   });
  app.get('/index', function(req, res, next) {
    console.log('index')
    res.sendFile(path.normalize(__dirname+'/index') + '/index.html');
  });

  app.route('/admin').get(function(req, res) {
    res.sendFile(path.normalize(__dirname+'/admin') + '/index.html');
    // res.render('index.html');
  });
  app.route('/agent').get(function(req, res) {
    res.sendFile(path.normalize(__dirname+'/agent') + '/index.html');
    // res.render('index.html');
  });
  app.route('/desuser').get(function(req, res) {
    res.sendFile(path.normalize(__dirname+'/desuser') + '/index.html');
    // res.render('index.html');
  });
};
