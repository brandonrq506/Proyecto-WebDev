var createError = require('http-errors');
var express = require('express'); //Esto crea el server local
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express(); //Server local

// view engine setup - motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json()); //especifica que vamos a trabajar con json
app.use(express.urlencoded({ extended: false })); //sirve para poder capturar datos del formulario sin errores
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //define nuestro directorio public, es por si uno migra el proyecto a otro equipo

var indexRouter = require('./routes/index');
var partidoRouter = require('./routes/partido');
var registerRouter = require('./routes/register'); //test path, don't erase it
const { resolve } = require('path');
const { rejects } = require('assert');

app.use('/', indexRouter);
app.use('/partido', partidoRouter);
app.use('/register', registerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;











/**===================================================================== */
/*Autenticación*/
app.post('/', function (req, res) { //la ruta corta
  const { connection } = require('./db');
  let user = req.body.correoEstudiantil;
  let pass = req.body.contrasena;
  console.log("[ " + user + " - " + pass + " ]");

  let Request = require('tedious').Request;
  const { TYPES } = require('tedious');

  function authUser() {
    const allRows = [];
    return new Promise((resolve, reject) => {
      let sql = '[dbo].[DBGetAuth]';
      const request = new Request(sql, function (err, rowCount) {
        console.log('Row Count ' + rowCount);
        if (rowCount == 0) {
          console.log('Estamos en el err row count 0');
          reject(err);
        } else {
          resolve(allRows);
        }

      });//request

      request.on('row', function (columns) {
        //let rowObject = {};
        for (const column of columns) {
          allRows[column.metadata.colName] = column.value;
        }
        console.log(allRows);// OJO
      });//request.on row

      request.on('doneProc', function (rowCount, more, returnStatus, rows) { //preguntarle a Brandon que hace esto
        resolve(allRows);
      });//request.on doneProc

      connection.callProcedure(request);

    });//promise
  }//authUser

  let listaJSON = authUser();
  listaJSON.then(users => {

    console.log('user ID ' + users.id);

    if (users.id == undefined) {
      res.send(`Error - Auth`);
    } else {
      res.render('registerT'); //archivo ejs
    }

  }).catch(noData => {
    res.send(`Error - Auth`);
  });

});//app.post
/**===================================================================== */