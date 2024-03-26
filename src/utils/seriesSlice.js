import { createSlice } from "@reduxjs/toolkit";

export const seriesSlice = createSlice({
    name:"series",
    initialState:{
        popularSeries:null,
        topRatedSeries:null
    },
    reducers:{
        addPopularSeries:(state,action)=> {
            state.popularSeries = action.payload;
        },
        addTopRatedSeries:(state,action) => {
            state.topRatedSeries = action.payload;
        }
    }
})

export const{addPopularSeries,addTopRatedSeries} = seriesSlice.actions
export const seriesReducer  = seriesSlice.reducer