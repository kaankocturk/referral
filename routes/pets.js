var express = require('express');
var router = express.Router();

var pets = ['cat', 'dog', 'hyena'];
router.get('/', function(req, res, next) {
  res.render('pets', { title: 'Pets' , pets: pets });
});

module.exports = router;
