var express = require('express');
var router = express.Router();
const { connection } = require('../db');

/* localhost:3000/partido/ */
router.get('/', function (req, res, next) {
    res.send('HomePage Partidos');
});


/* localhost:3000/partido/FA */
router.get('/:siglas', function (req, res, next) {
    res.send('Pagina partido especifico');
});

module.exports = router;


let partido1 = {
    id: 01,
    nombre: 'Juntos podemos',
    siglas: 'JP',
    logo: 'images/flag1.png',
    desripcion: 'Descripcion del partido',
    color: '#e9d8a6',
    miembros =[
        {
            nombre: 'Brandon',
            apellido: 'Ramirez',
            puesto: 'Presidente'
        }, {
            nombre: 'Julia',
            apellido: 'Rojas',
            puesto: 'Vice-Presidente'
        }, {
            nombre: 'Mario',
            apellido: 'Alfaro',
            puesto: 'Tesorero'
        }
    ],
    propuestas =[
        {
            descripcion: 'Propuesta 1'
        }, {
            descripcion: 'Propuesta 2'
        }, {
            descripcion: 'Propuesta 3'
        }
    ]
};

let partido2 = {
    id: 01,
    nombre: 'Unidad Democrática Costarricense',
    siglas: 'UDC',
    logo: 'images/flag2.png',
    desripcion: 'Descripcion del partido',
    color: '#a8dadc',
    miembros =[
        {
            nombre: 'Manuel',
            apellido: 'Chavarria',
            puesto: 'Presidente'
        }, {
            nombre: 'Natalia',
            apellido: 'Ezquivel',
            puesto: 'Vice-Presidenta'
        }, {
            nombre: 'Celeste',
            apellido: 'Mora',
            puesto: 'Tesorero'
        }
    ],
    propuestas =[
        {
            descripcion: 'Propuesta 1'
        }, {
            descripcion: 'Propuesta 2'
        }, {
            descripcion: 'Propuesta 3'
        }, {
            descripcion: 'Propuesta 4'
        }
    ]
};
