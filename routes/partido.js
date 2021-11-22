var express = require('express');
var router = express.Router();
const { connection } = require('../db');

/* localhost:3000/partido/ */
router.get('/', function (req, res, next) {
    res.send('HomePage Partidos');
});


/* localhost:3000/partido/FA */
// router.get('/:siglas', function (req, res, next) {
//     res.send('Pagina partido especifico');
// });


/*========== Esto es solo con el proposito de la presentación ==========*/
/* localhost:3000/partido/jp */
router.get('/jp', function (req, res, next) {
    res.render('partido', { partido: partido1 });
});

/* localhost:3000/partido/udc */
router.get('/udc', function (req, res, next) {
    res.render('partido', { partido: partido2 });

});

module.exports = router;


let partido1 = {
    id: 01,
    nombre: 'Juntos podemos',
    siglas: 'JP',
    logo: '/images/flag1.png',
    descripcion: 'Descripcion del partido',
    color: '#e9d8a6',
    miembros: [
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
    propuestas: [
        {
            propuesta: 'Propuesta 1'
        }, {
            propuesta: 'Propuesta 2'
        }, {
            propuesta: 'Propuesta 3'
        }
    ]
};

let partido2 = {
    id: 01,
    nombre: 'Unidad Democrática Costarricense',
    siglas: 'UDC',
    logo: '/images/flag2.png',
    descripcion: 'El partido Unidad Democrática Costarricense se basa en la honradez y la verdad como pilares fundamentales de su campaña política estudiantil. A lo largo de los años hemos visto que la escuela ha carecido del cuido requerido para mantenerla en optimas condiciones para el desarrollo de los niños. Nuestro partido consiste en personas de distintos grados que han sacado notas muy buenas y tienen ideas que se pueden llevar a cabo en el corto y largo plazo para tener resultados palpables.',
    color: '#a8dadc',
    miembros: [
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
    propuestas: [
        {
            propuesta: 'Velaremos por los derechos y deberes de todos los estudiantes de la escuela, garantizando una buena comunicación entre las necesidades/inconformidades estudiantiles con el personal docente, para así generar un ambiente educativo integro que nos permita disfrutar plenamente de nuestro proceso educativo'
        }, {
            propuesta: 'Promoveremos la participación en actividades típicas, potennciando iniciativas como una banda para la escuela, grupos de baile que cuenten con una profesa para enseñarles y permiso para faltar a las lecciones que tengan conflicto con las horas de entrenamiento.'
        }, {
            propuesta: 'Promoveremos un aumento de los espacios para practicar deporte y las zonas para realizar estas actividades. Entendemos que actualmente no se tiene permitido jugar en los corredores ni en la calle, por lo que planeamos hablar con los profesores para que nos concedan un espacio.'
        }, {
            propuesta: 'Para nuestra financiación haremos comidads una vez al mes con motivo de algun día festivo durante esas fechas.'
        }
    ]
};
