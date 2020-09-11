var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '소환사 정보를 보는 곳입니다.' });
});

module.exports = router;
