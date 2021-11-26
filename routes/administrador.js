var express = require('express');
var router = express.Router();
const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');

router.get('/', function (req, res, next) {
    res.render('Admin/homepage');
});

router.get('/partido', function (req, res, next) {
    res.render('Admin/partidoHome');
});

router.get('/partido/:partido', function (req, res, next) {
    let { partido } = req.params;
    res.render('Admin/partido');
});


module.exports = router;