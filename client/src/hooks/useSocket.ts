import { useRef } from "react";
import { pushMessage, resetMessages, setIsConnected } from "../store/reducers/chatReducer";
import { Message } from "../types/Message";
import { useTypedDispatch } from "./useTypedDispatch";

export const useSocket=()=>{

    const dispatch=useTypedDispatch()
    const socketRef=useRef<WebSocket>()

    return{
        socket:()=>socketRef.current,
        connect(){
            const webSocket = new WebSocket('ws:localhost:4200/')
            webSocket.onopen = () => {
            }
            webSocket.onclose = () => {
              dispatch(setIsConnected(false))
              dispatch(resetMessages())
            }
            webSocket.onmessage = ((message:MessageEvent) => {
              dispatch(pushMessage(JSON.parse(message.data) as Message))

            })
            socketRef.current = webSocket
          },
          disconect(){
            socketRef.current?.close()
          },
          send(message:string,username:string){
            if(socketRef.current){
              const messageDto:Message={username,message}
              socketRef.current.send(JSON.stringify(messageDto))
            }
        }
    }
}