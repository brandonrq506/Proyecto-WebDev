//Para realizar la llamada debemos IMPORTAR la coneccion a la Database y el objeto Request de Tedious, ademas de TYPES.
const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');


let deletePartido = function eliminarPartido(partidoId) {
    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[spDeletePartido_byId]';
        const request = new Request(storedProcedure, function (err, rowCount) {
            if (err) {
                return reject(err);
            } else {
                resolve(rowCount);
            }
        });

        request.on('doneProc', function (rowCount, returnStatus, rows) {
            resolve(rowCount);
        });

        request.addParameter('partidoId', TYPES.Int, partidoId);
        connection.callProcedure(request);
    });
}

/*
Este module.exports enviá la variable a donde sea que se requiera
en el lugar de destino debemos llamar el metodoc on getListaPartidos();
y emplear los methods .then() y .catch() tipicos de las promesas.
*/
module.exports = { deletePartido };