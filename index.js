var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var socketIo = require('socket.io').listen(server);
/*

const http = require('http').Server(app);
const socketIo = require('socket.io').listen(server);

*/
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(express.static('client-side-static'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	    extended: true
}));

app.use(bodyParser.json());
app.use(express.static('assests'))

//Route
app.get('/', function (req, res) {
	console.log('GET request on /');
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/vr', function (req, res) {
	console.log('GET request on /vr');
	res.sendFile(__dirname + '/aframe.html');
});

var mainString = ""
var mainString1 = ""
var mainString2 = ""
var screen = 1
//Socket Connections
socketIo.on('connection', function (socket) {
	console.log("Connection Done")
	socket.on('screenId', function (data){
		if (data == 1){
			screen = 1;
			socketIo.emit('text', mainString);
			console.log("Now on screen 1");
		}
		if (data == 2){
			screen = 2;
			socketIo.emit('text', mainString1);
			console.log("Now on screen 2");
		}
		if (data == 3){
			screen = 3;
			socketIo.emit('text', mainString2);
			console.log("Now on screen 3");
		}
	})
	socket.on('add', function (data) {
		console.log("Entered in add socket");
		if (screen == 1){
			mainString = data
			console.log('mainString:' + mainString);
			socketIo.emit('out1', data);
			console.log('Sending output to 1');
		}
		if (screen == 2){
			mainString1 = data
			console.log('mainString1:' + mainString1);
			socketIo.emit('out2', data);
			console.log('Sending output to 2');
		}
		if (screen == 3){
			mainString2 = data
			console.log('mainString2' + mainString2)
			socketIo.emit('out3', data);
			console.log('Sending output to 3');
		}
		console.log("Exiting");
	})
});

//server.listen(3000);
server.listen(3000, function () {
    console.log('Server started. Listening for requests on port 3000!');
});
