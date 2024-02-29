import React from "react";
import Header from "./Header";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import {  useTopRatedMovies } from "../hooks/useTopRatedMovies";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import SearchGptPage from "./SearchGptPage";

const Browse = () => {
  useNowPlayingMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  const showGpt = useSelector((store) => store.gpt.showGpt)
  // console.log(showGpt);

  return (
    <div className="">
      <Header />
      {showGpt? <SearchGptPage/>:<><MainContainer/>
      <SecondaryContainer/></>}
      
    </div>
  );
};

export default Browse;
