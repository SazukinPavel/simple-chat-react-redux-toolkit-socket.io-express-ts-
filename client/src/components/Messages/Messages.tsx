import React from "react";
import { useSocket } from "../../hooks/useSocket";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Chat from "./Chat";
import styles from './Messages.module.scss' 
import UsersList from "./UsersList";

function Messages(){

    const {room}=useTypedSelector((s)=>s.chat)
    const socket=useSocket()
    const [message, setMessage] = React.useState('');

   
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
                <h3 className={styles.Header}>Комната №{room}</h3>
                <div className={styles.ChatBlock}>
                    <Chat/>
                    <UsersList/>
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