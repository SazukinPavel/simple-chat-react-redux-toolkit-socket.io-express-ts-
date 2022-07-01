const WebSocket=require('ws')

const server=new WebSocket.Server({port:4200})

server.on('connection',(ws)=>{
    ws.send('hello')
})

