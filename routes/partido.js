var express = require('express');
var router = express.Router();
const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');

//  localhost:3000/partido/
router.get('/', function (req, res, next) {
    let listaPartidos = getAllParties();
    listaPartidos.then(partidos => {
        res.render('partidoHomePage', { partidos });
    });
    //Debemos hacer algo en caso de que la llamada falle, al menos con testing purposes
});

//  localhost:3000/partido/variable
router.get('/:partido', function (req, res, next) {
    res.render('partido', { partido: partido1 });
});

module.exports = router;

//Debemos intentar revisar si podemos crear un folder especifico para llamadas a DB
//Tipo la abstraccion que hicimos con la base de datos.
function getAllParties() {
    const allRows = [];
    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[Estudiante_GetAll]';
        const request = new Request(storedProcedure, function (err, rowCount) {
            if (err) {
                return reject(err);
            } else {
                resolve(allRows);
            }
        });

        request.on('row', function (columns) {

            let rowObject = {};
            for (const column of columns) {
                rowObject[column.metadata.colName] = column.value;
            }
            allRows.push(rowObject);
        });

        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
            resolve(allRows);
            console.log(allRows);
        });
        connection.callProcedure(request);
    });
}