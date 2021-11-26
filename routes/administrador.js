var express = require('express');
var router = express.Router();
const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');

router.get('/', function (req, res, next) {
    res.send('Admin Home page');
});

router.get('/partido', function (req, res, next) {
    res.send('Admin PartidoHome page');
});

router.get('/partido/:partido', function (req, res, next) {
    let { partido } = req.params;
    res.send(`Admin partido: ${partido} page`);
});


module.exports = router;