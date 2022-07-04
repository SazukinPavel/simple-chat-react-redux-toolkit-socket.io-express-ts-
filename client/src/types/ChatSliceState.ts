import { Message } from "./Message";
import { User } from "./User";

export default interface ChatSliceState{
    messages:Message[]
    isConnected:boolean
    username:string
    room?:number
    chatUsers:User[]
}