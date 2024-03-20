import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name:"movies",
    initialState:{
       allMovies:  [
            {
                nowPlayingMovies:null,
    
            },
            {
                topRatedMovies:null,
    
            },
            {
                upcomingMovies:null,
    
            },
            
        ],
        trailerVideo:null,
        movieInfo:null
    }
       
    ,
    reducers:{
        addNewPlayingMovies:(state,action) => {
            state.nowPlayingMovies = action.payload
        },
        addTrailerVideo:(state,action) => {
            state.trailerVideo = action.payload
        },
        addTopRatedMovies:(state,action) => {
            state.topRatedMovies = action.payload
        },
        addUpcomingMovies:(state,action) => {
            state.upcomingMovies = action.payload
        },
        
        addMovieInfo:(state,action) => {
            state.movieInfo = action.payload
        },
        clearTrailerVideo:(state,actionn) => {
            state.trailerVideo = null
        }

    }
})

export const{addNewPlayingMovies,addTrailerVideo,addTopRatedMovies,addUpcomingMovies,addMovieInfo,clearTrailerVideo} = moviesSlice.actions;
export const moviesSliceReducer = moviesSlice.reducer