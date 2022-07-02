const WebSocket=require('ws')

const server=new WebSocket.Server({port:4200})

server.on('connection',(ws)=>{
    
    ws.send(JSON.stringify({username:'ADMIN',message:'Hello user!'}))

    ws.on('message',(data)=>{
        data=JSON.parse(data)
        broadcastMessage(data)
    })
})

function broadcastMessage(message){
    server.clients.forEach((c)=>{
        c.send(JSON.stringify(message))
    })
}
