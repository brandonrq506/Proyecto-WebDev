var express = require('express');
var router = express.Router();
const { connection } = require('../db');

/* localhost:3000/partido/ */
router.get('/', function (req, res, next) {
    res.send('HomePage Partidos');
});


/* localhost:3000/partido/FA */
router.get('/:siglas', function (req, res, next) {
    res.send('Pagina partido especifico');
});

module.exports = router;
