//Para realizar la llamada debemos IMPORTAR la coneccion a la Database y el objeto Request de Tedious, ademas de TYPES.
const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');

//La primera llamada será insertando la informacion a la tabla partido
let createPartido = function completarPartido(partido) {
    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[spAddPartido]';
        const request = new Request(storedProcedure, function (err, rowCount) {
            if (err) {
                return reject(err);
            } else {
                resolve(rowCount);
            }
        });

        request.on('row', function (columns) {
            partido["partido"] = columns[0].value;
        });

        request.on('requestCompleted', function (rowCount) {
            resolve(setMiembros(partido));
        })

        request.addParameter('nombre', TYPES.VarChar, partido.nombre);
        request.addParameter('siglas', TYPES.VarChar, partido.siglas);
        request.addParameter('descripcion', TYPES.VarChar, partido.descripcion);
        connection.callProcedure(request);
    });
}


//La segunda será un bulk operation para insertar todas las propuestas
function setPropuestas(partido) {
    return new Promise((resolve, reject) => {
        const options = { keepNulls: true };

        const bulkLoad = connection.newBulkLoad('propuesta', options, function (error, rowCount) {
            resolve(rowCount)
        });

        // setup your columns - always indicate whether the column is nullable
        bulkLoad.addColumn('descripcion', TYPES.NVarChar, { length: 400, nullable: false });
        bulkLoad.addColumn('partido', TYPES.Int, { nullable: false });

        // execute
        connection.execBulkLoad(bulkLoad, [
            { descripcion: partido.propuesta[0], partido: partido.partido },
            { descripcion: partido.propuesta[1], partido: partido.partido },
            { descripcion: partido.propuesta[2], partido: partido.partido },
            { descripcion: partido.propuesta[3], partido: partido.partido }
        ]);
    });
}


//La tercera será un buik operation para insertar todos los estudiantes
function setMiembros(partido) {
    return new Promise((resolve, reject) => {
        const options = { keepNulls: true };

        const bulkLoad = connection.newBulkLoad('miembro', options, function (error, rowCount) {
            resolve(setPropuestas(partido))
        });

        // setup your columns - always indicate whether the column is nullable
        bulkLoad.addColumn('estudianteId', TYPES.Int, { nullable: false });
        bulkLoad.addColumn('partido', TYPES.Int, { nullable: false });
        bulkLoad.addColumn('puesto', TYPES.Int, { nullable: false });
        bulkLoad.addColumn('imagen', TYPES.NVarChar, { length: 200, nullable: false });

        // execute
        connection.execBulkLoad(bulkLoad, [
            { estudianteId: partido.estudiante[0], partido: partido.partido, puesto: partido.puesto[0], imagen: '...' },
            { estudianteId: partido.estudiante[1], partido: partido.partido, puesto: partido.puesto[1], imagen: '...' },
            { estudianteId: partido.estudiante[2], partido: partido.partido, puesto: partido.puesto[2], imagen: '...' },
        ]);
    });
}

module.exports = { createPartido };
