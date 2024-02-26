import { useDispatch, useSelector } from "react-redux";
import {  addPopularMovies, addUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_KEY_OPTIONS } from "../utils/constants";

export const useUpcomingMovies = () => {
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies)
  const dispatch = useDispatch();

  const fetchData = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/upcoming", API_KEY_OPTIONS);

    const jsonData = await data.json();
    // console.log(jsonData.results);
    dispatch(addUpcomingMovies(jsonData.results));
  };

  useEffect(() => {
  !upcomingMovies &&  fetchData();
  }, []);
};


