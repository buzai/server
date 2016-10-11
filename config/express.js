/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  // app.all('*',function (req, res, next) {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  //   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  //   if (req.method == 'OPTIONS') {
  //     res.send(200); /让options请求快速返回/
  //   }
  //   else {
  //     next();
  //   }
  // });
  
//   if ('production' === env) {
//     app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
//     app.use(express.static(path.join(config.root, 'public')));
//     app.set('appPath', path.join(config.root, 'public'));
//     app.use(morgan('dev'));
//   }

//   if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    // app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.normalize(__dirname+'/../public')));
    app.use(express.static(path.normalize(__dirname+'/../src')));

    console.log(path.normalize(__dirname+'/../public'))

    app.set('appPath', path.join('/../', 'src'));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
//   }
};