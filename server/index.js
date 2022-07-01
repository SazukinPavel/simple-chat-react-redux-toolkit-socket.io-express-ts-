const WebSocket=require('ws')

const server=new WebSocket.Server({port:4200})

server.on('connection',(ws)=>{
    ws.send('hello')

    ws.on('message',(data)=>{
        broadcastMessage(JSON.parse(data).message)
    })
})

server.on('close',()=>{
    console.log('close');
})


function broadcastMessage(message){
    server.clients.forEach((c)=>{
        c.send(message)
    })
}
