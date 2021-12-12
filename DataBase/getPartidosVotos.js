const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');

let getPartidosAndVotos = function getParties() {

    const partidos = createTemplate();

    const partidosALL = [];
    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[spGetPartidos]';
        const request = new Request(storedProcedure, function (err, rowCount) {
            if (err) {
                return reject(err);
            }
        });

        request.on('row', function (fila) {
            let partido = {};
            for (const column of fila) {
                partido[column.metadata.colName] = column.value;
            }
            partidosALL.push(partido);
        });

        request.on('requestCompleted', function () {
            partidos.partidosArray = partidosALL;
            resolve(getVotos(partidos));
        })

        connection.callProcedure(request);
    });
}

function getVotos(partidos) {
    const votos = [];
    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[spGetVotos]';
        const request = new Request(storedProcedure, function (err, rowCount) {
            if (err) { return reject(err); }
        });

        request.on('row', function (fila) {
            let voto = {};
            for (const columna of fila) {
                voto[columna.metadata.colName] = columna.value;
            }
            votos.push(voto);
        });

        request.on('requestCompleted', function () {
            partidos.votos = votos;
            resolve(partidos);
        })

        connection.callProcedure(request);
    });
}

function createTemplate() {
    let partido = {
        partidosArray: [],
        votos: []
    };
    return partido;
}

module.exports = { getPartidosAndVotos };