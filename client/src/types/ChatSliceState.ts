import { Message } from "./Message";

export default interface ChatSliceState{
    messages:Message[]
    isConnected:boolean
    username:string
    room?:number
}