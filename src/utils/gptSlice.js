import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:"gpt",
    initialState:{
        showGpt:false
    },
    reducers:{
        toggleShowGpt:(state,action) => {
            state.showGpt = !state.showGpt
        }
    }
})

export const {toggleShowGpt} = gptSlice.actions;
export const gptReducer = gptSlice.reducer;