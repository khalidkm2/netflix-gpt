import { useDispatch, useSelector } from "react-redux";
import { addNewPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_KEY_OPTIONS } from "../utils/constants";

export const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies)


  const fetchData = async () => {
    const data = await fetch("https://api.themoviedb.org/3/discover/movie", API_KEY_OPTIONS);

    const jsonData = await data.json();
    // console.log(jsonData.results);
    dispatch(addNewPlayingMovies(jsonData.results));
  };

  useEffect(() => {
   !nowPlayingMovies && fetchData();
  }, []);
};


