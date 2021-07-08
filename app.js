var config = require('./config');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var compression = require('compression');

require('./models/schema');

mongoose.Promise = require('bluebird');

var app = express();
app.use(compression());
app.use(cors());

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

mongoose.connect(config["DB_URL"],{poolSize:2});

mongoose.connection.on('connected', function(){
  console.log('DB CONNECTION ESTABLISHED');
});

mongoose.connection.on('error',function (err) {  
  console.log('ERROR CONNECTING DB ');
  
  setTimeout(function(){
    mongoose.connect(config["DB_URL"]);
  },5000);
});

mongoose.connection.on('disconnected', function () {  
  console.log('DB DISCONNECTED'); 
  
  setTimeout(function(){
    mongoose.connect(config["DB_URL"]);
  },5000);
});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    process.exit(0); 
  }); 
}); 

var io = require('./utils/sockets').listen(app);
var comments = require('./routes/comments');
var auth = require('./routes/user_auth');

app.get('/', function (request, response) {
  console.log('App Running');
  response.send('Un authorised access')
})

app.use(logger('dev')); //logs all the requests to backend in terminal
app.use(bodyParser.json({limit: '100mb'})); //payload size increased to 100mb
app.use(bodyParser.urlencoded({limit: '100mb', extended: true }));

app.use(cookieParser());

app.use(`${config["BASE_API_PATH"]}/auth`,auth);
app.use(`${config["BASE_API_PATH"]}/comments`,comments);

module.exports = app;