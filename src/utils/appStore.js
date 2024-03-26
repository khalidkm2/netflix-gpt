import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { moviesSliceReducer } from "./moviesSlice";
import { gptReducer } from "./gptSlice";
import { configSliceReducer } from "./configSlice";
import { seriesReducer } from "./seriesSlice";


const appStore = configureStore({
    reducer:{
        user:userReducer,
        movies:moviesSliceReducer,
        gpt:gptReducer,
        config:configSliceReducer,
        series:seriesReducer
        
    }
})

export default appStore