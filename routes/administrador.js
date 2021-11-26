var express = require('express');
var router = express.Router();
const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');

const { getListaPartidos } = require('../DataBase/getPartidos.js')

router.get('/', function (req, res, next) {
    res.render('Admin/homepage');
});

router.get('/partido', function (req, res, next) {
    getListaPartidos()
        .then(partidos => {
            console.log(partidos)
            res.render('Admin/partidoHome', partidos);
        })
        .catch(err => {
            res.send('There was an error with this call');
        })
});

router.get('/partido/:partido', function (req, res, next) {
    let { partido } = req.params;
    res.render('Admin/partido');
});

module.exports = router;