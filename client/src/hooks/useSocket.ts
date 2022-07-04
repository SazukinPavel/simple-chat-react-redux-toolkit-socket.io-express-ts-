import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { pushMessage, resetMessages, setIsConnected } from "../store/reducers/chatReducer";
import { Message } from "../types/Message";
import { useTypedDispatch } from "./useTypedDispatch";
import { useTypedSelector } from "./useTypedSelector";

export const useSocket = () => {

  const dispatch = useTypedDispatch()
  const {username,room}=useTypedSelector(s=>s.chat)
  const socketRef = useRef<Socket>()

  useEffect(()=>{
    const webSocket = io('http://localhost:4200/',{query:{username,room}})
    webSocket.on("connect", () => {
      dispatch(resetMessages())
    });
    webSocket.on("disconnect", () => {
      dispatch(setIsConnected(false))
      dispatch(resetMessages())
    });
    webSocket.on('newMessage',(message:MessageEvent)=>{
      dispatch(pushMessage(message.data.message))
    })
    socketRef.current = webSocket
    return ()=>{
      socketRef.current?.off('newMessage')
      socketRef.current?.off('disconnect')
      socketRef.current?.off('connect')
    }
  },[])

  return {
    connect(){
      socketRef.current?.open()
    },
    disconect() {
      socketRef.current?.disconnect()
    },
    send(message: string) {
      if (socketRef.current) {
        const messageDto: Message = { username, message }
        socketRef.current.emit('message', messageDto)
      }
    }
  }
}



