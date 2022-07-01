import React from "react";
import styles from './Messages.module.scss'

interface MessagesProps{
    messages:string[]
    disconnect:()=>void
    send:(mes:string)=>void
}

function Messages({messages,disconnect,send}:MessagesProps){
   
    const [message, setMessage] = React.useState('');

    const sendMessage=()=>{
        if(message){
            send(message)
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
                    {messages.map((m)=><p>{m}</p>)}
                </div>
            </div>
            <div>
                <button onClick={disconnect}>Отсоеденится</button>
                <button onClick={sendMessage}>Отправить</button>
            </div>
        </div>
     );
}

export default Messages;