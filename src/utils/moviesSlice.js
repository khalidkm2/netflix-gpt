import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        trailerVideo:null,
        popularMovies:null,
        upcomingMovies:null,
        movieInfo:null
    },
    reducers:{
        addNewPlayingMovies:(state,action) => {
            state.nowPlayingMovies = action.payload
        },
        addTrailerVideo:(state,action) => {
            state.trailerVideo = action.payload
        },
        addPopularMovies:(state,action) => {
            state.popularMovies = action.payload
        },
        addUpcomingMovies:(state,action) => {
            state.upcomingMovies = action.payload
        },
        
        addMovieInfo:(state,action) => {
            state.movieInfo = action.payload
        },
        clearTrailerVideo:(state,actionn) => {
            state.movieInfo = null
        }

    }
})

export const{addNewPlayingMovies,addTrailerVideo,addPopularMovies,addUpcomingMovies,addMovieInfo,clearTrailerVideo} = moviesSlice.actions;
export const moviesSliceReducer = moviesSlice.reducer