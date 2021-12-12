const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');


let getValidacionAndPartidos = function getValidacion(estudianteID) {

    const partidos = createTemplate();
    const verificacion = [];

    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[spGetVotacionRealizada]';
        const request = new Request(storedProcedure, function (err, rowCount) {
            if (err) { return reject(err); }
        });

        request.on('row', function (fila) {
            let voto = {};
            for (const columna of fila) {
                voto[columna.metadata.colName] = columna.value;
            }
            verificacion.push(voto);
        });

        request.on('requestCompleted', function () {
            partidos.verificacionVoto = verificacion;
            resolve(getParties(partidos));
        })

        request.addParameter('estudianteID', TYPES.Int, estudianteID);
        connection.callProcedure(request);
    });


}

function getParties(partidos) {

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
            resolve(partidos);
        })

        connection.callProcedure(request);
    });

}

function createTemplate() {
    let partido = {
        verificacionVoto: [],
        partidosArray: []
    };
    return partido;
}

module.exports = { getValidacionAndPartidos };