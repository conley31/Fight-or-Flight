const PORT = process.env.PORT || 8080;
// Package Imports
var express = require('express'),
  bodyParser = require('body-parser'),
  formidable = require('formidable'),
  util = require('util'),
  fs = require('fs'),
  nconf = require('nconf'),
  morgan = require('morgan'),
  session = require('express-session')

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'PondTool',
  database : 'HIGHSCORE'
});
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mode = "NOT_RUNNING";
var players = [];

connection.connect();
if (app.get('env') === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev')); // Pretty logging in dev mode
}

app.use(express.static(__dirname + '/public')); // Serve static files from the public directory
app.use(bodyParser.json()); // Decode JSON from request bodies
// Options for urlencoded requests
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '50mb'
}));
app.set('view engine', 'ejs'); // Use ejs to render templates
if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // session package - trust first proxy if on production system
}

app.get('/', function(req, res) {
  res.render('index.ejs', {
    production: app.get('env') === 'production',
    title: 'Fight or Flight'
  });
});

io.on('connection', function (socket) {
  socket.on('join', function(data) {
    socket.id = data;
    socket.broadcast.emit('newplayer', data, players);
    socket.emit('state', mode);
  });

  socket.on('keys', function (data) {
    socket.broadcast.emit('keyMult', socket.id, data);
  });

  socket.on('players', function(data){
    players = data;
  });

  socket.on('HIGHSCORE', function(){
    var query = "SELECT * FROM player"
    for(i = 1; i < 16; i++){
      var temp = query + i;
      connection.query(temp, function(err, results, feilds){
        if(err) {
          throw err;
        }
        socket.emit('returnscore', results);
      });
    }
  });

  socket.on("overS", function(state){
    if(state == "GAME_OVER"){
      mode = "GAME_OVER";
    }
    else if(state == "NEXT_LEVEL"){
      mode = "NEXT_LEVEL";
      socket.broadcast.emit("waiting");
    }
    else if(state == "RUNNING"){
      mode = "RUNNING";
    }
    else if(state == "NOT_RUNNING"){
      mode = "NOT_RUNNING";
    }
  });

  socket.on('putScore', function(scores){
    var query = "UPDATE player";
    var command = " SET name = \"";
    var command2 = " SET score = \"";
    for(i = 1; i < 16; i++){
      if(scores[i-1] != null){
        if(scores[i-1][0] != null){
          var temp = query + i + command + scores[i-1][0].name + "\"";
          connection.query(temp, function(err, results, feilds){
            if(err) {
              throw err;
            }
          });
          var temp = query + i + command2 + scores[i-1][0].score + "\"";
          connection.query(temp, function(err, results, feilds){
            if(err) {
              throw err;
            }
          });
        }
      }
    }
    socket.broadcast.emit('returnscore', scores);
  });
});

// 404 Page (Always keep this as the last route)
app.get('*', function(req, res) {
  if (req.xhr) {
    res.status(404).send({
      errorMessage: 'Not Found'
    });
    return;
  }
  res.format({
    html: function() {
      res.status(404).render('error.ejs', {
        error: 'Page Not Found: ' + req.hostname + req.originalUrl,
        production: app.get('env') === 'production',
        title: 'Page Not Found - Fight or Flight'
      });
    },
    json: function() {
      res.status(404).send({
        errorMessage: 'Not Found'
      });
    },
    default: function() {
      res.sendStatus(404);
    }
  });
});

app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  // If the request was sent by a XHR, then send the error as JSON
  if (req.xhr) {
    if (app.get('env') === 'production') {
      // Don't expose the full error to the client if on a production machine, but keep them for debuggging
      res.status(500).send({
        errorMessage: err.message || 'Something failed, please contact an administrator'
      });
    } else {
      res.status(500).send({
        errorMessage: err.message || 'Something failed, please contact an administrator',
        error: err
      });
    }
    console.error(err.stack);
  } else {
    return next(err); // Let default error handler handle non-XHR requests
  }
});

var server = http.listen(PORT, function() {
  console.log('Running Server on Port', PORT, 'in', app.get('env') === 'production' ? 'Production mode' : 'Development Mode');
});

// Gracefully handle exits by closing the database pool
var exitHandler = function() {
  connection.end();
  process.exit(0);
  /*setTimeout(function() {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 30 * 1000);*/

};

process.on('SIGINT', exitHandler);
process.on('SIGTERM', exitHandler);