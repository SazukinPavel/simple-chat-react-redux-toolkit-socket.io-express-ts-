import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ChatSliceState from "../../types/ChatSliceState";
import { LoginDto } from "../../types/dto/Login.dto";
import { Message } from "../../types/Message";

const initialState:ChatSliceState={messages:[],isConnected:false,username:'',room:undefined}

export const chatReducer=createSlice({
    initialState,
    name:'chat',
    reducers:{
        setIsConnected(state,action:PayloadAction<boolean>){
            state.isConnected=action.payload
        },
        pushMessage(state,action:PayloadAction<Message>){
            state.messages.push(action.payload)
        },
        resetMessages(state){
            state.messages=[]
        },
        setUser(state,action:PayloadAction<LoginDto>){
            state.username=action.payload.username
            state.room=action.payload.room
        }
    }
})

export const {setIsConnected,pushMessage,resetMessages,setUser}=chatReducer.actions