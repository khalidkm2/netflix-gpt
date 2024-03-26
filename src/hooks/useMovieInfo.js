
import { useEffect } from "react";
import { API_KEY_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMovieInfo } from "../utils/moviesSlice";


export const useMovieInfo = (id,titleName) => {
    const dispatch = useDispatch()
    // const movieInfo = useSelector((store) => store.movies.trailerVideo)



    const getMovieInfo = async () => {
        const data = await fetch(
          `
          https://api.themoviedb.org/3/${titleName}/${id}`,
          API_KEY_OPTIONS
        );
        const jsonData = await data.json();
        // console.log(jsonData);
       
        dispatch(addMovieInfo(jsonData));
        // console.log(trailerVideo.key);
      };
    
      useEffect(() => {

       getMovieInfo()
      }, []);
}