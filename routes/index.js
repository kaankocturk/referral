var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var url = req.url;
  console.log(req.headers.host);
  res.render('index', {
    title: 'EXPRESS!!!!!!',
    host: req.headers.host
  });
});

module.exports = router;
