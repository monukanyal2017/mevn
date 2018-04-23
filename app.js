const express = require('express');
var app = express();
const path = require('path');
const md5=require('md5');
var mv = require('mv');  //its for chokidar
//var morgan = require('morgan'); //http request logger
var mongoose=require('mongoose');
var sysPath = require('path');
const fileUpload = require('express-fileupload');
/*---------------------------

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url ="mongodb://Esfera:esfera456@ds133547.mlab.com:33547/esferasoft";
------------------------------*/

mongoose.connect('mongodb://monu:monu@ds261138.mlab.com:61138/apidb', { useMongoClient: true });  //live
mongoose.Promise = global.Promise;


var port =process.env.PORT || 8081;
var http=require('http').Server(app);
var io=require('socket.io')(http);
       http.listen(port);


const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'fav.png')));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

/*------routes Define---------------------*/
const routes = require('./routes/index.js');
const Api = require('./routes/Api.js');

app.use('/', routes);
app.use('/api', Api);

console.log('server runnig at '+ port);
/*---------routes end---------------------*/

/*io.on('connection', function(socket){

     // console.log('socket started');
      socket.on('req_fetchinfo', function(room){
            socket.join(room);
            var value=gen();
             //var color=randomColor();
            io.to(room).emit('get_fetchinfo',value);
      });
});*/
        




