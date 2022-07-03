
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

app.post('/rooms', (req, res) => {
  
});

io.on('connection', (socket) => {
    socket.emit('newMessage',{data:{
        message:'New user!!!'
    }})
    socket.on('message',(data)=>{
        io.sockets.emit('newMessage',{data})
    })
})

server.listen(4200, () => {
  console.log('listening on *:4200');
});
