import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io';
import { Message } from './types/Message';
import { Rooms } from './types/Rooms';
import { User } from './types/User';

const app = express();
app.use(express.json())
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});

const rooms = new Rooms()

io.on('connection', (socket) => {
    const room = socket.handshake.query.room as string
    const username = socket.handshake.query.username as string
    if (!room || !username) {
        socket.disconnect()
    }
    const user = new User(username)
    rooms.createRoom(room)
    socket.join(room)
    sendRoomMessages(room, socket)
    sendRoomUsers(room,socket)
    addNewUser(room,user)
    addNewMessageInRoom({ username: '', message: `Пользователь ${user.username} вошёл в чат.` }, room)
    socket.on('message', (data: Message) => {
        addNewMessageInRoom(data, room)
    })
    socket.on("disconnect",()=> disconnect(room,user));
})

server.listen(4200, () => {
    console.log('listening on *:4200');
});

function disconnect(room: string, user: User) {
    removeUser(room, user.id)
    addNewMessageInRoom({ username: '', message: `Пользователь ${user.username} вышел из чата.` }, room)
}

function sendRoomMessages(roomId: string, socket: Socket) {
    const messages = rooms.getMessages(roomId)
    socket.emit('getMessages', { data: messages })
}

function sendRoomUsers(roomId:string,socket:Socket){
    const users=rooms.getUsers(roomId)
    socket.emit('getUsers',{data:users})
}

function addNewMessageInRoom(message: Message, room: string) {
    rooms.addNewMessage(message, room)
    emitNewMessageInRoom(message, room)
}

function emitNewMessageInRoom(message: Message, room: string) {
    io.to(room).emit('newMessage', { data: { message } })
}

function removeUser(room: string, userId: string) {
    io.to(room).emit('removeUser', { data: { userId } })
    rooms.removeUser(room, userId)
}

function addNewUser(room:string,user:User){
    io.to(room).emit('newUser',{data:user})
    rooms.pushUser(room, user)
}