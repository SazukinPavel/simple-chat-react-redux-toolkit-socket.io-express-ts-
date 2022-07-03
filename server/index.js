const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
app.use(express.json())
const server = http.createServer(app);
const io = new Server(server,{ 
    cors:{
        origin: "http://localhost:3000",
    }
});

io.on('connection', (socket) => {
    console.log(socket.request._query.username);
    io.sockets.emit('newMessage',{data:{
        message:`Пользователь ${socket.request._query.username} вошёл в чат.`
    }})
    socket.on('message',(data)=>{
        io.sockets.emit('newMessage',{data})
    })
    socket.on("disconnect", (reason) => {
        io.sockets.emit('newMessage',{data:{
            message:`Пользователь ${socket.request._query.username} вышел из чата.`
        }})
    });
})

server.listen(4200, () => {
  console.log('listening on *:4200');
});
