var express = require('express');
var router = express.Router();

//Estas son las llamadas a la base de datos que estamos utilizando en estas paginas de Administrador
const { getListaPartidos } = require('../DataBase/getPartidos.js');
const { deletePartido } = require('../DataBase/deletePartido.js')

//  localhost:3000/ad/
router.get('/', function (req, res, next) {
    res.render('Admin/index');
});

//  localhost:3000/ad/partido/
router.get('/partido', function (req, res, next) {
    getListaPartidos()
        .then(partidos => {
            res.render('Admin/partidos', { partidos });
        })
        .catch(err => {
            res.send('There was an error with this call');
        })
});

// ======= NOT IMPLEMENTED YET ==========================
//  localhost:3000/ad/partido/variable
router.get('/partido/:partido', function (req, res, next) {
    let { partido } = req.params;
    res.render('Admin/partido');
});

// localhost:3000/ad/partido/variable
router.delete('/partido/:partido', function (req, res) {
    let { partido } = req.params;
    deletePartido(partido)
        .then(result => {
            res.redirect('/ad/partido');
        })

});


module.exports = router;