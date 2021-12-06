var express = require('express');
var router = express.Router();
const { connection } = require('../db');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('Estudiante/votos');
});

module.exports = router;