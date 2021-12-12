const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');

let verificarVotoExistente = function verificarVoto(id) {
    let verificacionVoto = {}     //Declaramos un objeto
    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[spGetVotacionRealizada]'; //Query
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

        //Solo un parametro
        request.addParameter('estudianteID', TYPES.Int, id);
        connection.callProcedure(request);
    });
}

module.exports = { verificarVotoExistente };