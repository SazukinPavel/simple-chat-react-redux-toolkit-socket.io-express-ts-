import express from 'express'
import http from 'http'
import { Server } from 'socket.io';
import { Message } from './types/Message';

const app = express();
app.use(express.json())
const server = http.createServer(app);
const io = new Server(server,{ 
    cors:{
        origin: "http://localhost:3000",
    }
});

const rooms=new Map<string,{users:string[],messages:string[]}>()

io.on('connection', (socket) => {
    const room=socket.handshake.query.room as string
    const username=socket.handshake.query.username as string
    if(!room || !username){
        socket.disconnect()
    }
    if(!rooms.has(room)) {
        rooms.set(room, {users:[],messages:[]})
    }
    pushUserToRoom(room,username)
    socket.join(room)
    emitNewMessageInRoom({username:'',message:`Пользователь ${username} вошёл в чат.`},room)
    socket.on('message',(data:Message)=>{
        emitNewMessageInRoom(data,room)
    })
    socket.on("disconnect", (reason) => {
        emitNewMessageInRoom({username:'',message:`Пользователь ${username} вышел из чата.`},room)
    });
})

server.listen(4200, () => {
  console.log('listening on *:4200');
});

function pushUserToRoom(room:string,username:string){
    if (rooms.has(room)) {
        rooms.get(room)?.users.push(username)
    }
}

function emitNewMessageInRoom(message:Message,room:string){
    io.to(room).emit('newMessage',{data:{message}})
}