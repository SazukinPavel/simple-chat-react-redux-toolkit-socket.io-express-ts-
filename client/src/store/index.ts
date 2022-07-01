import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./reducers/chatReducer";

export const store=configureStore({
    reducer:{
        chat:chatReducer.reducer
    }
})

export type StoreType=ReturnType<typeof store.getState>
export type DispatchType=typeof store.dispatch