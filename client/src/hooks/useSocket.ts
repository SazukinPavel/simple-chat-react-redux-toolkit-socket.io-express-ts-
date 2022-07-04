import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { addUser, pushMessage, removeUserById, resetChat, setChatUsers, setIsConnected, setMessages } from "../store/reducers/chatReducer";
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
      dispatch(resetChat())
    })
    webSocket.on("disconnect", () => {
      dispatch(setIsConnected(false))
      dispatch(resetChat())
    })
    webSocket.on('getMessages',(message:MessageEvent)=>{
      dispatch(setMessages(message.data))
    })
    webSocket.on('getUsers',(message:MessageEvent)=>{
      dispatch(setChatUsers(message.data))
    })
    webSocket.on('newMessage',(message:MessageEvent)=>{
      dispatch(pushMessage(message.data.message))
    })
    webSocket.on('removeUser',(message:MessageEvent)=>{
      dispatch(removeUserById(message.data.userId))
    })
    webSocket.on('newUser',(message:MessageEvent)=>{
      dispatch(addUser(message.data))
    })
    socketRef.current = webSocket
    return ()=>{
      socketRef.current?.off('newMessage')
      socketRef.current?.off('disconnect')
      socketRef.current?.off('connect')
      socketRef.current?.off('newUser')
      socketRef.current?.off('removeUser')
      socketRef.current?.off('getUsers')
      socketRef.current?.off('getMessages')
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



