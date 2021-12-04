//Para realizar la llamada debemos IMPORTAR la coneccion a la Database y el objeto Request de Tedious, ademas de TYPES.
const { connection } = require('../db');
let Request = require('tedious').Request;
const { TYPES } = require('tedious');

