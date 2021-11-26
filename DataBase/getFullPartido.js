//Para realizar la llamada debemos IMPORTAR la coneccion a la Database y el objeto Request de Tedious, ademas de TYPES.
const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');

/*
Estos metodos retornan (Entre todos) un solo objeto Partido, este contendrá la información del partido, las propuestas y los miembros con toda la información.
{
    partidoId: 0,
    nombre: '',
    siglas: '',
    logo: '',
    descripcion: '',
    color: '',
    propuestas = [
        {descripcion: ''},
        {descripcion: ''},
        {descripcion: ''}
    ],
    miembros = [
        {
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
            puesto: '',
            imagen: ''
        }
    ]
}
//Un modelo de esta informacion se puede ver al final de esta pagina
*/
let getFullPartido = function getPartido(siglas) {
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

//Esta template la utilizan los metodos arriba para llenarla. No borrar.
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

module.exports = { getFullPartido };