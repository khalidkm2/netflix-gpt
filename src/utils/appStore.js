import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { moviesSliceReducer } from "./moviesSlice";


const appStore = configureStore({
    reducer:{
        user:userReducer,
        movies:moviesSliceReducer
    }
})

export default appStore