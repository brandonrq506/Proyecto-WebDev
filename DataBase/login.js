const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');

//Method returns all the information in the table student, allowing us to personalize the homepage.
let login = function verificarLogin(correo, contra) {
    let estudiante = {}     //Declaramos un objeto
    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[spLogin]';
        const request = new Request(storedProcedure, function (err) {
            if (err) {
                return reject(err);
            } else {
                resolve(estudiante);
            }
        });

        request.on('row', function (fila) {
            for (const columna of fila) {
                estudiante[columna.metadata.colName] = columna.value;
            }
        });

        request.on('doneProc', function (rowCount) {
            resolve(estudiante);
        });

        request.addParameter('correo', TYPES.VarChar, correo);
        request.addParameter('contrasena', TYPES.VarChar, contra);
        connection.callProcedure(request);
    });
}

/*
Este module.exports enviá la variable a donde sea que se requiera
en el lugar de destino debemos llamar el metodoc on getListaPartidos();
y emplear los methods .then() y .catch() tipicos de las promesas.
*/
module.exports = { login };