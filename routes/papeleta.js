let express = require('express');
let router = express.Router();

const { login } = require('../DataBase/login.js')

/* GET papeleta page. */
router.get('/', function (req, res, next) {
    res.send('Error');
});

/*router.post('/papeleta', function (req, res) {
    let correo = global.config.LoggedEstudentData.correo;
    let contra = global.config.LoggedEstudentData.contrasena;
    console.log('Variables cargadas: ' + correo);
    login(correo, contra)
        .then(estudiante => {
            if (estudiante.estudianteId > 0) {

                console.log('Renderizando Papeleta con usuario autenticado');

                res.render('Estudiante/votos', { estudiante });
                //res.render('Estudiante/votos');
            } else {
                //Si ningun estudiante hace match, que se debe hacer:

                //Con un addEventListener('submit', func(e) { e.preventDefault(); }) para hacer el login del admin
                //O se podria hacer en al base de datos con una columna que sea: isAdmin.
            }
        })
});*/


module.exports = router;