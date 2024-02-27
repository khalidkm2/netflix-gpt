import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovieInfo } from "../hooks/useMovieInfo";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import { IMAGE_URL } from "../utils/constants";
import { clearTrailerVideo } from "../utils/moviesSlice";
import Genre from "./Genre";

const MovieInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch()

  useMovieInfo(id);

  const movieInfo = useSelector((store) => store.movies.movieInfo);
  console.log(movieInfo);


  useEffect(()=> {
    return ()=> {
        dispatch(clearTrailerVideo())
    }
  },[dispatch])


  if(!movieInfo) return
  const { runtime, title, release_date, poster_path,genres,overview} = movieInfo;



  return (
    <div className=" bg-black h-screen overflow-auto text-white">
    <div className=" max-w-[1200px] mx-auto">
    <div className="title">
        <div className=" text-white text-center py-10">
          <h1 className=" text-4xl">{title}</h1>
          <span className=" mx-2">{release_date}</span>
          <span>runtime:{runtime}hrs</span>
        </div>
      </div>
     
        <div className=" bg-slate-300  flex mx-auto">
          <img
            className="w-[300px] "
            alt="image"
            src={IMAGE_URL + poster_path}
          />
          <div className=" ">
          <VideoBackground fullWidth={false} id={id} />
        </div>
        </div>
        <div className=" my-8">
        <div className="flex  py-2">
{genres.map((genre) => <Genre key={ genre.id} genre={genre.name}/>)}
     </div>
     <p className=" max-w-[700px] ">{overview}</p>
        </div>
     
    </div>
     

    </div>
  );
};

export default MovieInfo;
