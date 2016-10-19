var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/share', function(req, res, next) {
  console.log('share');
  res.render('share');
});

router.get('/privacy', function(req, res, next) {
  res.render('privacy');
});

router.get('/pp', function(req, res, next) {
  res.render('privacy');
});

router.get('/home', function(req, res, next) {
  console.log('home');
  res.render('home');
});

router.get('/:id', function(req, res, next) {
  console.log('index');
  res.render('index');
});



module.exports = router;
