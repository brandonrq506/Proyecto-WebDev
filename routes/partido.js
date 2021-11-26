var express = require('express');
var router = express.Router();
const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');

//  localhost:3000/partido/
router.get('/', function (req, res, next) {
    let listaJSON = getParties();
    listaJSON.then(partidos => {
        res.render('partidoHome', { partidos });
    });
});



//  localhost:3000/partido/variable/
router.get('/:partido', function (req, res, next) {
    let { partido } = req.params
    getPartido(partido)
        .then((partidoConInfo) => {
            res.render('partido', { partido: partidoConInfo });
        })
});

module.exports = router;

/*================  LLAMADAS A BASE DE DATOS ================= */



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


//llamamos un partido por medio de las siglas en el URL.
function getPartido(siglas) {
    const partido = createPartyTemplate();

    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[spGetPartido_PorSiglas]';
        const request = new Request(storedProcedure, function (err, rowCount) {
            if (err) { return reject(err); }
        });

        request.on('row', function (fila) {
            for (const columna of fila) {
                partido[columna.metadata.colName] = columna.value;
            }
        });

        request.on('requestCompleted', function () {
            resolve(getPropuestas(partido));
        })

        request.addParameter('siglas', TYPES.VarChar, siglas);
        connection.callProcedure(request);
    });
}

//Llamamos todas las propuestas de un partido en específico
function getPropuestas(partido) {

    const propuestas = [];
    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[spGetPropuestas_PorPartido]';
        const request = new Request(storedProcedure, function (err, rowCount) {
            if (err) { return reject(err); }
        });

        request.on('row', function (fila) {
            let propuesta = {};
            for (const columna of fila) {
                propuesta[columna.metadata.colName] = columna.value;
            }
            propuestas.push(propuesta);
        });

        request.on('requestCompleted', function () {
            partido.propuestas = propuestas;
            resolve(getMiembros(partido));
        })
        request.addParameter('partidoId', TYPES.Int, partido.partidoId);
        connection.callProcedure(request);
    });
}

//Llamamos todos los miembros de un partido en específico
function getMiembros(partido) {
    const miembros = [];
    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[spGetMiembros_PorPartido]';
        const request = new Request(storedProcedure, function (err, rowCount) {
            if (err) { return reject(err); }
        });

        request.on('row', function (fila) {
            let miembro = {};
            for (const columna of fila) {
                miembro[columna.metadata.colName] = columna.value;
            }
            miembros.push(miembro);
        });

        request.on('requestCompleted', function () {
            partido.miembros = miembros;
            resolve(partido);
        })

        request.addParameter('partidoId', TYPES.Int, partido.partidoId);
        connection.callProcedure(request);
    });
}

function createPartyTemplate() {
    let partido = {
        partidoId: 0,
        nombre: '',
        siglas: '',
        logo: '',
        descripcion: '',
        color: '',
        miembros: [],
        propuestas: []
    };
    return partido;
}