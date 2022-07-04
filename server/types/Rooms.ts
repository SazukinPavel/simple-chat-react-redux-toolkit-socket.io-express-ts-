import { Message } from "./Message"
import { User } from "./User"

export class Rooms{
    
    rooms=new Map<string,{users:User[],messages:Message[]}>()

    pushUser(roomId:string,user:User){
        if (this.rooms.has(roomId)) {
            this.rooms.get(roomId)?.users.push(user)
        }
    }

    removeUser(roomId:string,userId:string){
        if (this.rooms.has(roomId)) {
            let index=this.rooms.get(roomId)?.users.findIndex(u=>u.id===userId) ?? -1
            if(index===-1){
                return
            }
            this.rooms.get(roomId)?.users.splice(index,1)
        }
    }

    addNewMessage(message:Message,roomId:string){
        if(this.rooms.has(roomId)) {
            this.rooms.get(roomId)?.messages.push(message)
        }
    }

    getMessages(roomId:string){
        if(this.rooms.has(roomId)) {
            return this.rooms.get(roomId)?.messages
        } 
    }

    getUsers(roomId:string){
        if(this.rooms.has(roomId)) {
            return this.rooms.get(roomId)?.users
        }
    }

    createRoom(roomId:string){
        if(!this.rooms.has(roomId)) {
            this.rooms.set(roomId, {users:[],messages:[]})
        }
    }
}