const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');

//Nos retornará una lista de ESTUDIANTES que NO sean MIEMBROS de ningún partido todavía.


//Metodo retorna estudianteId, nombre, primerApellido
let getEstudiantes = function getListaEstudiantes() {
    const estudiantes = [];
    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[spGet_NoMiembros]';
        const request = new Request(storedProcedure, function (err, rowCount) {
            if (err) {
                return reject(err);
            } else {
                resolve(estudiantes);
            }
        });

        request.on('row', function (columns) {

            let estudiante = {};
            for (const column of columns) {
                estudiante[column.metadata.colName] = column.value;
            }
            estudiantes.push(estudiante);
        });

        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
            resolve(estudiantes);
        });
        connection.callProcedure(request);
    });
}

module.exports = { getEstudiantes };