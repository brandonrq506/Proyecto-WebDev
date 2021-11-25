var express = require('express');
var router = express.Router();
const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');

//  localhost:3000/partido/
router.get('/', function (req, res, next) {
    let listaJSON = getParties();
    listaJSON.then(partidos => {
        res.render('partidoHomePage', { partidos });
    });
});

//  localhost:3000/partido/variable/
router.get('/:partido', function (req, res, next) {
    res.render('partido', { partido });
});

module.exports = router;

//Debemos intentar revisar si podemos crear un folder especifico para llamadas a DB
//Tipo la abstraccion que hicimos con la base de datos.
function getParties() {
    const partidos = [];
    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[spGetPartidos]';
        const request = new Request(storedProcedure, function (err, rowCount) {
            if (err) {
                return reject(err);
            } else {
                resolve(partidos);
            }
        });

        request.on('row', function (columns) {

            let partido = {};
            for (const column of columns) {
                partido[column.metadata.colName] = column.value;
            }
            partidos.push(partido);
        });

        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
            resolve(partidos);
        });
        connection.callProcedure(request);
    });
}