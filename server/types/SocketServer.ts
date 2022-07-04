import { Server, ServerOptions, Socket } from 'socket.io'
import http from 'http'
import { Rooms } from './Rooms';
import { Message } from './Message';
import { User } from './User';

export class SocketServer {
    private io: Server
    private rooms: Rooms

    constructor(server: http.Server, opts: Partial<ServerOptions>) {
        this.io = new Server(server, opts)
        this.rooms = new Rooms()
    }

    startupServer() {
        this.io.on('connection', (socket) => {
            const {username,room}=this.validateUser(socket)
            const user= new User(username)
            this.joinUserToRoom(socket,room,user)
            this.addNewMessageInRoom({ username: '', message: `Пользователь ${user.username} вошёл в чат.` }, room)
            socket.on('message', (data: Message) => {
                this.addNewMessageInRoom(data, room)
            })
            socket.on("disconnect", () => this.disconnectUser(room, user));
        })
    }

    private validateUser(socket:Socket){
        const room = socket.handshake.query.room as string
        const username = socket.handshake.query.username as string
        if (!room || !username) {
            socket.disconnect()
        }
        return {username,room}
    }

    private joinUserToRoom(socket: Socket, room: string, user: User) {
        this.rooms.createRoom(room)
        socket.join(room)
        this.sendRoomMessages(room, socket)
        this.sendRoomUsers(room, socket)
        this.addNewUser(room, user)
    }

    private disconnectUser(room: string, user: User) {
        this.removeUser(room, user.id)
        this.addNewMessageInRoom({ username: '', message: `Пользователь ${user.username} вышел из чата.` }, room)
    }

    private sendRoomMessages(roomId: string, socket: Socket) {
        const messages = this.rooms.getMessages(roomId)
        socket.emit('getMessages', { data: messages })
    }

    private sendRoomUsers(roomId: string, socket: Socket) {
        const users = this.rooms.getUsers(roomId)
        socket.emit('getUsers', { data: users })
    }

    private addNewMessageInRoom(message: Message, room: string) {
        this.rooms.addNewMessage(message, room)
        this.emitNewMessageInRoom(message, room)
    }

    private emitNewMessageInRoom(message: Message, room: string) {
        this.io.to(room).emit('newMessage', { data: { message } })
    }

    private removeUser(room: string, userId: string) {
        this.io.to(room).emit('removeUser', { data: { userId } })
        this.rooms.removeUser(room, userId)
    }

    private addNewUser(room: string, user: User) {
        this.io.to(room).emit('newUser', { data: user })
        this.rooms.pushUser(room, user)
    }
}