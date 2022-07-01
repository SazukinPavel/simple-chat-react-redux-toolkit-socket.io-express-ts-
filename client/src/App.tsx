import React from 'react';
import './App.scss'
import Login from './components/Login';
import Messages from './components/Messages';

function App() {

  const [isConnected, setIsConnected] = React.useState(false);
  const [messages, setMessages] = React.useState<string[]>([]);
  const socket = React.useRef<WebSocket>()


  const connect = () => {
    const webSocket = new WebSocket('ws:localhost:4200/')
    webSocket.onopen = () => {
     console.log('open');
      setIsConnected(true)
    }
    webSocket.onclose = () => {
      console.log('close');
      setMessages([])
      setIsConnected(false)
    }
    webSocket.onmessage = ((m) => {
      console.log(m.data);
      setMessages((prev)=>[...prev,m.data])
    })
    socket.current = webSocket
  }

  const disconect=()=>{
    if(socket.current){
      socket.current.close()
    }
  }

  const send=async (m:string)=>{
    console.log(m);
    
    if(socket.current){
      await socket.current.send(JSON.stringify({message:m}))
    }
  } 

  return (
    <div className='chat'>
      <h1>{isConnected ? 'Подключено' : 'Не подключено'}</h1>
      {
        !isConnected ?
          <div>
            <Login connect={connect}/>
          </div>
          : <div>
            <Messages messages={messages} disconnect={disconect} send={send}/>
          </div>
      }
    </div>
  );
}

export default App;
