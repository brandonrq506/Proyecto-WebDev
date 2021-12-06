let express = require('express');
let router = express.Router();

const { login } = require('../DataBase/login.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('Estudiante/index');
});

//Not writting router.get('/home') eliminates the possibility of errors.
//That page can only be loaded with personalized data.
router.post('/home', function (req, res) {
  let { correo, contra } = req.body;
  login(correo, contra)
    .then(estudiante => {
      if (estudiante.estudianteId > 0) {
        res.render('Estudiante/home', { estudiante });
      } else {
        //Si ningun estudiante hace match, que se debe hacer:

        //Con un addEventListener('submit', func(e) { e.preventDefault(); }) para hacer el login del admin
        //O se podria hacer en al base de datos con una columna que sea: isAdmin.
      }
    })
});

module.exports = router;