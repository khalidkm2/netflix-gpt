import { createSlice } from "@reduxjs/toolkit";


const configSlice = createSlice({
    name:"language",
    initialState:{
        lang:"en",
        showSeries:false
    },
    reducers:{
        setLanguage:(state,action)=> {
            state.lang = action.payload
        },
        setShowSeries:(state,action) => {
            state.showSeries = action.payload;
        }
    }

})

export const {setLanguage,setShowSeries} = configSlice.actions
export const configSliceReducer = configSlice.reducer
