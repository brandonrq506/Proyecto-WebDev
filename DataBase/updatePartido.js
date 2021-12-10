const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');


let updatePartido = function udpateSlice(information) {
    return new Promise((resolve, reject) => {
        if (information.nombre == undefined) {       //This means we are updating proposals, not core information.
            resolve(udpateProposals(information));
        } else {
            resolve(udpateCore(information));
        }
    });

}

function udpateProposals(partido) {
    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[spUpdate_Propuestas]';
        const request = new Request(storedProcedure, function (err, rowCount) {
            if (err) {
                return reject(err);
            } else {
                resolve(rowCount);
            }
        });

        console.log(partido)
        request.addParameter('partidoId', TYPES.Int, partido.partidoId);
        request.addParameter('propuesta1', TYPES.VarChar, partido.propuesta[0]);
        request.addParameter('propuesta2', TYPES.VarChar, partido.propuesta[1]);
        request.addParameter('propuesta3', TYPES.VarChar, partido.propuesta[2]);
        request.addParameter('propuesta4', TYPES.VarChar, partido.propuesta[3]);
        connection.callProcedure(request);
    });
}

function udpateCore(partido) {
    return new Promise((resolve, reject) => {
        let storedProcedure = '[dbo].[spUpdate_Partido]';
        const request = new Request(storedProcedure, function (err, rowCount) {
            if (err) {
                return reject(err);
            } else {
                resolve(rowCount);
            }
        });

        request.addParameter('partidoId', TYPES.Int, partido.partidoId);
        request.addParameter('nombre', TYPES.VarChar, partido.nombre);
        request.addParameter('siglas', TYPES.VarChar, partido.siglas);
        request.addParameter('descripcion', TYPES.VarChar, partido.descripcion);
        connection.callProcedure(request);
    });
}


module.exports = { updatePartido };