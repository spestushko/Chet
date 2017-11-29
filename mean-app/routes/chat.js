var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Chat = require('../models/Chat.js');

server.listen(4000);

/**
* Socket.io
*/
io.on('connection', function (socket) {
  console.log(`User connected`);
  socket.on('disconnect', function() {
    console.log(`User disconnected`);
  });
  socket.on('save-message', function(data) {
    console.log(`Save message data: ${data}`);
    io.emit('new-message', { message:data });
  });
});

/**
* Get all chats
*/
router.get('/:room', function(req, res, next) {
  Chat.find({ room: req.params.room }, function(err, chats) {
    if (err) return next(err);
    res.json(chats);
  });
});

/**
* Save chat
*/
router.post('/', function(req, res, next) {
  Chat.create(req.body, function(err, post) {
    if (err) return next (err);
    res.json(post);
  });
});

module.exports = router;
