import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ChatSliceState from "../../types/ChatSliceState";
import { LoginDto } from "../../types/dto/Login.dto";
import { Message } from "../../types/Message";
import { User } from "../../types/User";

const initialState:ChatSliceState={messages:[],isConnected:false,username:'',room:undefined,chatUsers:[]}

export const chatReducer=createSlice({
    initialState,
    name:'chat',
    reducers:{
        setIsConnected(state,action:PayloadAction<boolean>){
            state.isConnected=action.payload
        },
        setMessages(state,action:PayloadAction<Message[]>){
            state.messages=action.payload
        },
        pushMessage(state,action:PayloadAction<Message>){
            state.messages.push(action.payload)
        },
        resetChat(state){
            state.messages=[]
            state.chatUsers=[]
        },
        setUser(state,action:PayloadAction<LoginDto>){
            state.username=action.payload.username
            state.room=action.payload.room
        },
        setChatUsers(state,action:PayloadAction<User[]>){
            state.chatUsers=action.payload
        },
        addUser(state,action:PayloadAction<User>){
            state.chatUsers.push(action.payload)
        },
        removeUserById(state,action:PayloadAction<string>){
            console.log(action.payload);
            state.chatUsers=state.chatUsers.filter(u=>u.id!==action.payload)
        }
    }
})

export const {setIsConnected,pushMessage,resetChat,setUser,setMessages,setChatUsers,addUser,removeUserById}=chatReducer.actions