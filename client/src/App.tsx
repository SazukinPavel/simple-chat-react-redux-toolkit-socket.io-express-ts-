import React from 'react';
import './App.scss'

function App() {

  const [isConnected, setIsConnected] = React.useState(false);
  const socket=React.useRef<WebSocket>()

  React.useEffect(()=>{
    const webSocket=new WebSocket('ws:localhost:4200')
    webSocket.onopen=(e)=>{
      setIsConnected(true)
    }
    webSocket.onclose=()=>{
      setIsConnected(false)
    }
    webSocket.onmessage=((m)=>{
      console.log(m);
    })
    socket.current=webSocket
  },[])

  return (
    <div className='chat'>
      <h1>{isConnected?'Подключено':'Не подключено'}</h1>
      {
        isConnected?
        <div>
          <label></label>
        </div>
        :<div>

        </div>
      }
    </div>
  );
}

export default App;
