import { useEffect } from "react";
import { API_KEY_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";


export const useMovieTrailer = (id) => {
    const dispatch = useDispatch()
    const movieTrailer = useSelector((store) => store.movies.trailerVideo)



    const getVideosList = async () => {
      // console.log("inside getvideoslist");
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          API_KEY_OPTIONS
        );
        const jsonData = await data.json();
        // console.log(jsonData);
        const filteredVideo = jsonData.results.filter(
          (video) => video.type === "Trailer"
        );
        // console.log(filteredVideo);
        const trailer = filteredVideo.length
          ? filteredVideo[0]
          : jsonData.results[0];
        dispatch(addTrailerVideo(trailer));
        // console.log(trailerVideo.key);
      };
    
      useEffect(() => {

        getVideosList();
      }, []);
}