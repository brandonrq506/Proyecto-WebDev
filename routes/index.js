let express = require('express');
let router = express.Router();

const { login } = require('../DataBase/login.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('Estudiante/index');
});

router.get('/home', function (req, res) {
  res.render('Estudiante/home')
});

router.post('/home', function (req, res) {
  let { correo, contra } = req.body;
  login(correo, contra)
    .then(estudiante => {
      if (estudiante.estudianteId > 0) {
        res.redirect('/home');
      }
    })
});

module.exports = router;