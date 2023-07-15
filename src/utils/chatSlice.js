import { createSlice } from "@reduxjs/toolkit";
import { Live_Count } from "./Helper";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: []
    }, 
    reducers:{
        addMessage: (state, action)=>{
            state.messages.splice(Live_Count,1);
            state.messages.unshift(action.payload);
        },
    },
});

export const {addMessage} = chatSlice.actions
export default chatSlice.reducer