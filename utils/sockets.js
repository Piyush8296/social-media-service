var express = require('express');
var app = express();
var socketio = require('socket.io');
var config = require('../config');

var SOCKET_LIST = {};

var ALL_USERS = {}

//just an addon, in case if it is required to have real time communication
module.exports = {
	listen :function(app){
		
		var server = app.listen(process.env.PORT || config.SERVER_PORT);
		var io = socketio(server);

		io.on('connection', function(socket){
			socket.on('test-emit', function(data){
				console.log(data);
			});

			socket.on('user_joined', function(user_id){
				SOCKET_LIST[user_id] = socket;

				socket.join(user_id)
				ALL_USERS[user_id] = io.sockets;
			});

			socket.on('disconnect', function(){
				console.log('DISCONNECTED')
				module.exports.get_all_servers_connected(socket.id)
			});

			socket.on('user_disconnect', function(user_id){
				delete SOCKET_LIST[user_id];
			});

		});

		return io;
	},
};