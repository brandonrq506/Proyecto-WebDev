const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');

let realizarVoto = function insertarVoto(estudianteID, siglas) {
    let verificacionVoto = {}     //Declaramos un objeto
    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[spAddVoto]'; // Query
        const request = new Request(storedProcedure, function (err) {
            if (err) {
                return reject(err);
            } else {
                resolve(verificacionVoto);
            }
        });

        request.on('row', function (fila) {
            for (const columna of fila) {
                verificacionVoto[columna.metadata.colName] = columna.value;
            }
        });

        request.on('doneProc', function (rowCount) {
            resolve(verificacionVoto);
        });
        //Agregamos los parametros
        request.addParameter('estudianteID', TYPES.Int, estudianteID);
        request.addParameter('siglas', TYPES.VarChar, siglas);
        connection.callProcedure(request);
    });
}


module.exports = { realizarVoto };