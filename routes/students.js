'use strict';

let express = require('express');
let router = express.Router();

router.all('/', (req, res) => {
  res.render('students');
});

module.exports = router;
