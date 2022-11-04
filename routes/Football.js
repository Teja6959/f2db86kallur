var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Football', { title: 'Search results Football' });
});

module.exports = router;
