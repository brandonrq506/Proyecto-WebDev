
//Para realizar la llamada debemos IMPORTAR la coneccion a la Database y el objeto Request de Tedious.
const { connection } = require('../db');
let Request = require('tedious').Request;

/*
Este metodo retorna un Array de objetos 'Partido' con los siguientes valores:
{
    partidoId: 0,
    nombre: '',
    siglas: '',
    logo: '',
    descripcion: '',
    color: ''
}
*/
let getListaPartidos = function getParties() {
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

/*
Este module.exports enviá la variable a donde sea que se requiera
en el lugar de destino debemos llamar el metodoc on getListaPartidos();
y emplear los methods .then() y .catch() tipicos de las promesas.
*/
module.exports = { getListaPartidos };