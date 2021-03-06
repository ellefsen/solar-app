var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require('axios');
const Influx = require('influxdb-nodejs')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const client = new Influx('http://hoyaas:secret@influxdb:8086/hoyaas')

app.get('/', async (req, res) => {
  await client.query('battery')
    .then((response) => {
      console.info(response)
      res.json(response)
    })
    .catch(console.error)
})

app.get('/write', async (req, res) => {

  await axios.get('http://api')
    .then(async response => {

      await client.write('battery')
        .field(response.data)
        .then(() => console.info('write point success'))
        .catch(console.error);

      res.json(response.data)    
    })

  res.json({
    hello: 'world'
  })
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
