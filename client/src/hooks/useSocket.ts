import { useRef } from "react";
import { io, Socket } from "socket.io-client";
import { pushMessage, resetMessages, setIsConnected } from "../store/reducers/chatReducer";
import { Message } from "../types/Message";
import { useTypedDispatch } from "./useTypedDispatch";

export const useSocket = () => {

  const dispatch = useTypedDispatch()
  const socketRef = useRef<Socket>()

  return {
    socket: () => socketRef.current,
    connect() {
      const webSocket = io('http://localhost:4200/')
      webSocket.open()
      webSocket.on("connect", () => {
        dispatch(resetMessages())

      });
      webSocket.on("disconnect", () => {
        dispatch(setIsConnected(false))
        dispatch(resetMessages())
      });
      webSocket.on('newMessage',(message:MessageEvent)=>{
        dispatch(pushMessage(message.data))

      })
      socketRef.current = webSocket
    },
    disconect() {
      socketRef.current?.disconnect()
    },
    send(message: string, username: string) {
      if (socketRef.current) {
        const messageDto: Message = { username, message }
        socketRef.current.emit('message', messageDto)
      }
    }
  }
}