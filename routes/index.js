var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers);
  res.render('index', { title: 'Express' });
})
.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
})

module.exports = router;
