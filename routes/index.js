const express = require('express');
const md5 = require('md5');
const router = express.Router();
var User=require('../Models/user.js'); //including model
var jwt = require('jsonwebtoken');

router.get('/', function (req, res) {
  res.render('index.html');
});



module.exports = router;
