import { v4 } from "uuid"

export class User{

    username:string
    id:string

    constructor(username:string){
        this.username=username
        this.id=v4()
    }
}