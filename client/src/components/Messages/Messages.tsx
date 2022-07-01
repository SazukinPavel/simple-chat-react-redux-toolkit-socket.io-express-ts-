import React, { useEffect } from "react";
import { useSocket } from "../../hooks/useSocket";
import { useTypedSelector } from "../../hooks/useTypedSelector";


function Messages(){
   
    const {messages,username}=useTypedSelector((s)=>s.chat)
    const socket=useSocket()
    const [message, setMessage] = React.useState('');

    useEffect(()=>{
        console.log(socket);
        
        socket.connect()
    },[])

    const sendMessage=()=>{
        if(message){
            socket.send(message,username)
        }
    }
   
    return ( 
        <div>
            <div>
                <label>
                    Сообщение:
                    <input value={message} onChange={e=>setMessage(e.target.value)}></input>
                </label>
                <div>
                    {messages.map((m)=><p>{m.message}</p>)}
                </div>
            </div>
            <div>
                <button onClick={socket.disconect}>Отсоединится</button>
                <button onClick={sendMessage}>Отправить</button>
            </div>
        </div>
     );
}

export default Messages;