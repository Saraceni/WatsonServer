#!/usr/bin/env node

'use strict';

var server = require('./app');
var http = require('http').Server(server);
var io = require('socket.io')(http);
server.io_socket = io;
var port = process.env.PORT || process.env.VCAP_APP_PORT || 2424;

io.on('connection', function(socket){
  console.log('Device connected');
  socket.on('disconnect', function(){
    console.log('Device disconnected');
  });
});

http.listen(port, function() {
  console.log('Server running on port: %d', port);
});
