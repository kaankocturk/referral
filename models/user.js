'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  count: Number
});

var User = mongoose.model('User', userSchema);

module.exports = User;
