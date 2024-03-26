import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieInfo } from "../hooks/useMovieInfo";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import { IMAGE_URL } from "../utils/constants";
import { clearTrailerVideo } from "../utils/moviesSlice";
import Genre from "./Genre";
import MovieCreaters from "./MovieCreaters";

const MovieInfo = () => {
  console.log("inside movie info");
  const { id } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const showSeries = useSelector((store) => store.config.showSeries);
  let titleName = showSeries?"tv":"movie";

  

  useMovieInfo(id,titleName);

  const movieInfo = useSelector((store) => store.movies.movieInfo);
  // const seriesInfo = useSelector((store) => store.series.)
  console.log(movieInfo);


  // useEffect(()=> {
  //   return ()=> {
  //       dispatch(clearTrailerVideo())
  //   }
  // },[dispatch])


  if(!movieInfo) return
  console.log(movieInfo);
  const { runtime, title, release_date, poster_path,genres,overview,production_companies} = movieInfo;
 

console.log(production_companies);
const handleClick = () => {
  navigate("/browse")
}

  return (
    <>
    <div className=" bg-black">
    {/* <Header/> */}
    <button className=" absolute   text-4xl text-white p-4 left-0" onClick={handleClick}>🔙</button>

    </div>
<div className=" bg-[#0a0811] h-screen overflow-auto text-white">
    <div className=" max-w-[1200px] bg-[#141212] mx-auto">
    <div className="title">
        <div className="  ml-5 py-10 text-gray-300">
          <h1 className=" text-red-500 text-5xl font-bold my-2">{title}</h1>
          <span className="  font-semibold mr-3"><span className=" ">Released: </span>{release_date}</span>
          <span className=" font-semibold">Runtime:{runtime}min</span>
        </div>
      </div>
     
        <div className="  flex mx-auto">
          <img
            className="w-[300px] mx-auto"
            alt="image"
            src={IMAGE_URL + poster_path}
          />
          <div className=" hidden lg:block  ">
          <VideoBackground fullWidth={false} id={id} />
        </div>
        </div>
        <div className=" my-8">
        <div className="flex  py-2 ml-3">
{genres.map((genre) => <Genre key={ genre.id} genre={genre.name}/>)}
     </div>
     <p className=" max-w-[700px] my-4 py-2 px-6 text-gray-300 "><span className=" block text-gray-400">Overview</span>{overview}</p>
     <hr className=" opacity-40" />
  
        </div>
<h1 className=" text-red-600 text-center font-bold text-3xl my-6">Production Companies</h1>
<div className=" flex justify-around py-24 flex-wrap">
{production_companies && production_companies.map((info) => <MovieCreaters key={info.id} info={info}/>)}


</div>

     
    </div>
     

    </div>
    </>
    
  );
};

export default MovieInfo;
