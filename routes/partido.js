var express = require('express');
var router = express.Router();

const { getListaPartidos } = require('../DataBase/getPartidos.js')
const { getFullPartido } = require('../DataBase/getFullPartido.js')

//  localhost:3000/partido/
router.get('/', function (req, res, next) {
    getListaPartidos()
        .then(partidos => {
            res.render('Estudiante/partidos', { partidos });
        });
});

//  localhost:3000/partido/variable/
router.get('/:partido', function (req, res, next) {
    let { partido } = req.params
    getFullPartido(partido)
        .then((partidoConInfo) => {
            res.render('Estudiante/partido', { partido: partidoConInfo });
        })
});

//Exportamos los routers para que puedan ser utilizados por la app en app.js
module.exports = router;