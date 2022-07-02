import { current } from "@reduxjs/toolkit";
import React, { useEffect, useRef } from "react";
import { useSocket } from "../../hooks/useSocket";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MessageCard from "./Message/Message";
import styles from './Messages.module.scss' 

function Messages(){
   
    const {messages,username}=useTypedSelector((s)=>s.chat)
    const socket=useSocket()
    const [message, setMessage] = React.useState('');
    const messagesDivRef=useRef<HTMLDivElement>(null)

    useEffect(()=>{
        socket.connect()
    },[])

    useEffect(()=>{
        messagesDivRef.current?.scroll({top:messagesDivRef.current.scrollHeight})
    },[messages])

    const sendMessage=()=>{
        if(message){
            socket.send(message,username)
        }
    }
   
    return ( 
        <div className={styles.Messages}>
            <div className={styles.MessageBox}>
                <div ref={messagesDivRef} className={styles.DivMessages}>
                    {messages.map((m)=><MessageCard {...m}/>)}
                </div>
                <label>
                    Сообщение:
                    <input value={message} onChange={e=>setMessage(e.target.value)}></input>
                </label>
            </div>
            <div className={styles.buttons}>
                <button className={styles.Disconnect} onClick={socket.disconect}>Отсоединится</button>
                <button className={styles.Send} onClick={sendMessage}>Отправить</button>
            </div>
        </div>
     );
}

export default Messages;