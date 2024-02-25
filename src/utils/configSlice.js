import { createSlice } from "@reduxjs/toolkit";


const configSlice = createSlice({
    name:"language",
    initialState:{
        lang:"en"
    },
    reducers:{
        setLanguage:(state,action)=> {
            state.lang = action.payload
        }
    }

})

export const {setLanguage} = configSlice.actions
export const configSliceReducer = configSlice.reducer
