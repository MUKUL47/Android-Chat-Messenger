var http = require('http').createServer(require('express')());
var io = require('socket.io')(http);
io.on('connection', (socket)=>{

    socket.on('sendMessage', (msg)=>{
        io.emit('sendMessage', msg);
      });

    socket.on('isTyping', (msg)=>{
      io.emit('isTyping', msg);
    });    

});
http.listen(1000)