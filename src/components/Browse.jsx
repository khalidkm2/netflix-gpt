import React, { useEffect } from "react";
import Header from "./Header";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import {  useTopRatedMovies } from "../hooks/useTopRatedMovies";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import { useDispatch, useSelector } from "react-redux";
import SearchGptPage from "./SearchGptPage";
import { clearTrailerVideo } from "../utils/moviesSlice";
import Footer from "./Footer";

const Browse = () => {
  useNowPlayingMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  const dispatch = useDispatch()

  const showGpt = useSelector((store) => store.gpt.showGpt)
  // console.log(showGpt);

  useEffect(()=> {
    return ()=> {
        dispatch(clearTrailerVideo())
    }
  },[])

  return (
    <div className="">
      <Header />
      {showGpt? <SearchGptPage/>:<><MainContainer/>
      <SecondaryContainer/><Footer/></>}
      
      
    </div>
  );
};

export default Browse;
