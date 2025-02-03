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
        movieInfo:null,
        watchList:[],
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
        },
        addToWatchlist: (state, action) => {
            const movieIndex = state.watchList.findIndex(movie => movie.id === action.payload.id);
            console.log("watchlist", state.watchList);
            
            if (movieIndex !== -1) {
              // Movie exists, remove it
              state.watchList.splice(movieIndex, 1);
            } else {
              // Movie doesn't exist, add it
              state.watchList.push(action.payload);
            }
          }
,          
          removeFromWatchlist: (state, action) => {
            state.watchList = state.watchList.filter(movie => movie.id !== action.payload);
          }

    }
})

export const{addNewPlayingMovies,addTrailerVideo,addTopRatedMovies,addUpcomingMovies,addMovieInfo,clearTrailerVideo,addToWatchlist,removeFromWatchlist} = moviesSlice.actions;
export const moviesSliceReducer = moviesSlice.reducer