import React from "react";
import { useSocket } from "../../hooks/useSocket";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MessageCard from "./Message/Message";
import styles from './Messages.module.scss' 

function Messages(){

    const {messages}=useTypedSelector((s)=>s.chat)
    const socket=useSocket()
    const [message, setMessage] = React.useState('');
    const messagesDivRef=React.useRef<HTMLDivElement>(null)

    React.useEffect(()=>{
        messagesDivRef.current?.scroll({top:messagesDivRef.current.scrollHeight})
    },[messages])

    const sendMessage=()=>{
        if(message){
            socket.send(message)
        }
    }

    const disconect=()=>{
        socket.disconect()
    }
   
    return ( 
        <div className={styles.Messages}>
            <div className={styles.MessageBox}>
                <div ref={messagesDivRef} className={styles.DivMessages}>
                    {messages.map((m,i)=><MessageCard key={i} {...m}/>)}
                </div>
                <label>
                    Сообщение:
                    <input value={message} onChange={e=>setMessage(e.target.value)}></input>
                </label>
            </div>
            <div className={styles.buttons}>
                <button className={styles.Disconnect} onClick={disconect}>Отсоединится</button>
                <button className={styles.Send} onClick={sendMessage}>Отправить</button>
            </div>
        </div>
     );
}

export default Messages;