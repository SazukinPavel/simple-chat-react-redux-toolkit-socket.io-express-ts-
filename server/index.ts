import express from 'express'
import http from 'http'
import { SocketServer } from './types/Socket';

const app = express();
app.use(express.json())
const server = http.createServer(app);
const io=new SocketServer(server,{cors:{origin:'http://localhost:3000'}})
io.startupServer()

server.listen(4200, () => {
    console.log('listening on *:4200');
});

