'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function(req, res) {
  User.findOne({email: req.body.email}).exec(function(err, user){
    if(user){
      res.send('registered');
    }else{
      var newuser = new User(req.body);
      newuser.save(function(err, saveditem) {
        res.send(saveditem);
      });
    }
    });
  });

  router.post('/referral', function(req, res) {
    User.findOne(req.body).exec(function(err, user) {
      if(user){
        user.count+=1;
        user.save(function(err, saveditem) {
          res.send(saveditem);
        });
      }
      });
    });

  router.get('/emaillist/1', function(req, res, next) {
    User.find({}).exec(function(err, items) {
        res.send(items);
      });
    });

    router.get('/:id', function(req, res, next) {
      User.findOne({email: req.params.id}).exec(function(err, user) {
          res.send(user);
        });
      });


module.exports = router;
