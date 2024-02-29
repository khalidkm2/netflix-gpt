import { useDispatch, useSelector } from "react-redux";
import {  addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_KEY_OPTIONS } from "../utils/constants";

export const useTopRatedMovies = () => {
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies)
  
  const dispatch = useDispatch();

  const fetchData = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/top_rated", API_KEY_OPTIONS);

    const jsonData = await data.json();
    // console.log(jsonData.results);
    dispatch(addTopRatedMovies(jsonData.results));
  };

  useEffect(() => {
  !topRatedMovies &&  fetchData();
  }, []);
};


