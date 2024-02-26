import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:"gpt",
    initialState:{
        showGpt:false,
        gptMovies:null,
        gptResults:null
    },
    reducers:{
        toggleShowGpt:(state,action) => {
            state.showGpt = !state.showGpt
        },
        addGptMovies:(state,action) => {
            const{results,gptResults} = action.payload
            state.gptResults = gptResults
            state.gptMovies = results
        },
        
    }
})

export const {toggleShowGpt,addGptMovies} = gptSlice.actions;
export const gptReducer = gptSlice.reducer;