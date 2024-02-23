import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        trailerVideo:null
    },
    reducers:{
        addNewPlayingMovies:(state,action) => {
            state.nowPlayingMovies = action.payload
        },
        addTrailerVideo:(state,action) => {
            state.trailerVideo = action.payload
        }
    }
})

export const{addNewPlayingMovies,addTrailerVideo} = moviesSlice.actions;
export const moviesSliceReducer = moviesSlice.reducer