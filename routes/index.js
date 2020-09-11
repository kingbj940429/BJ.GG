var express = require('express');
var router = express.Router();
var getSeason = require('../axios/season.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title: 'BJ.GG'})
});

module.exports = router;
