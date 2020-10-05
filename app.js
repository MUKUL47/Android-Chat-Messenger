
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket)=>{

    socket.on('sendMessage', (msg)=>{
        io.emit('sendMessage', msg);
      });

    socket.on('isTyping', (msg)=>{
      io.emit('isTyping', msg);
    });    

});
server.listen(4201);