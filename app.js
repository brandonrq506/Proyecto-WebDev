let createError = require('http-errors');
let express = require('express'); //Esto crea el server local
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let methodOverride = require('method-override'); //Permite el uso de metodos DELETE, PUT, PATCH desde formularios

let app = express(); //Server local

global.config = require('./config'); //Variables globales

// view engine setup - motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));   //Define como llamaremos a los metodos que no sean GET/POST.

app.use(logger('dev'));
app.use(express.json()); //especifica que vamos a trabajar con json
app.use(express.urlencoded({ extended: true })); //sirve para poder capturar datos del formulario sin errores
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //define nuestro directorio public, es por si uno migra el proyecto a otro equipo


//Rutas de archivos JS en 'Routes'
let indexRouter = require('./routes/index');
let partidoRouter = require('./routes/partido');
let adminRouter = require('./routes/administrador');
let papeleta = require('./routes/papeleta');

const { resolve } = require('path');
const { rejects } = require('assert');

//Links de nuestro website
app.use('/', indexRouter);
app.use('/partido', partidoRouter);
app.use('/ad', adminRouter);
app.use('/voto', papeleta);


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