import React from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import MessageCard from "./MessageCard";
import styles from './Chat.module.scss'

function Chat() {
    
    const messagesDivRef=React.useRef<HTMLDivElement>(null)
    const {messages}=useTypedSelector(s=>s.chat)

    React.useEffect(()=>{
        messagesDivRef.current?.scroll({top:messagesDivRef.current.scrollHeight})
    },[messages])


    return ( 
        <div ref={messagesDivRef} className={styles.DivMessages}>
            {messages.map((m,i)=><MessageCard key={i} {...m}/>)}
        </div>
     );
}

export default Chat;