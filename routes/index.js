let express = require('express');
let router = express.Router();

const { login } = require('../DataBase/login.js');
//const { verificarVotoExistente } = require('../DataBase/getVotacionRealizada.js');
const { realizarVoto } = require('../DataBase/addVoto.js');
const { getValidacionAndPartidos } = require('../DataBase/getValidacionAndPartidos.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('Estudiante/index');
});

//Not writting router.get('/home') eliminates the possibility of errors.
//That page can only be loaded with personalized data.
router.post('/home', function (req, res) {
  let { correo, contra } = req.body;
  console.log(correo, contra);

  if (correo == "admin@ya.com" && contra == "Contra11!") {
    res.render("Admin/index.ejs");
  } else {
    login(correo, contra)
      .then(estudiante => {
        if (estudiante.estudianteId > 0) {

          //Con esto agregamos la información del Logged User a nuestras variables globales.
          global.config.LoggedEstudentData.estudianteId = estudiante.estudianteId;
          global.config.LoggedEstudentData.correo = estudiante.correo;
          global.config.LoggedEstudentData.contrasena = estudiante.contrasena;
          console.log('Variables Globales actualizadas');

          res.render('Estudiante/home', { estudiante });
        } else {
          //Si ningun estudiante hace match, que se debe hacer:

          //Con un addEventListener('submit', func(e) { e.preventDefault(); }) para hacer el login del admin
          //O se podria hacer en al base de datos con una columna que sea: isAdmin.
        }
      });
  }

});

//renderiza la papeleta
router.post('/papeleta', function (req, res) {
  let id = global.config.LoggedEstudentData.estudianteId;
  console.log('El ID del estudiante evaludado es: ' + id);
  getValidacionAndPartidos(id)
    .then(partido => {
      //console.log(partido);
      if (partido.verificacionVoto[0] == null) {
        console.log('Usted no ha votado');
        res.render('Estudiante/papeleta', { partido }); //estudiante/votos
      } else {
        console.log('Usted ya votó');
        res.render('Estudiante/yaVoto');
      }
    });
});

router.post('/enviandoVoto', function (req, res, next) {
  let estudianteId = global.config.LoggedEstudentData.estudianteId;
  let siglasForm = req.body;
  console.log('Id estudiante: ' + estudianteId + ' - Siglas partido: ' + siglasForm.siglas);
  realizarVoto(estudianteId, siglasForm.siglas)
    .then(verificacionVoto => {
      if (verificacionVoto) {
        console.log('Voto realizado exitosamente.');
        res.render('Estudiante/votoRealizado');
      } else {
      }
    });
});


module.exports = router;