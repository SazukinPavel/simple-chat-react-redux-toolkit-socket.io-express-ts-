import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ChatSliceState from "../../types/ChatSliceState";
import { Message } from "../../types/Message";

const initialState:ChatSliceState={messages:[],isConnected:false,username:''}

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
        setUserName(state,action:PayloadAction<string>){
            state.username=action.payload
        }
    }
})

export const {setIsConnected,pushMessage,resetMessages,setUserName}=chatReducer.actions