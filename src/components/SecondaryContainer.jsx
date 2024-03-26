import React, { useState } from "react";
import MovieList from "./MovieList";
import { useDispatch, useSelector } from "react-redux";
import { usePopularSeries } from "../hooks/usePopularSeries";
import { setShowSeries } from "../utils/configSlice";
import { useTopRatedSeries } from "../hooks/useTopRatedSeries";

const SecondaryContainer = () => {
  // const [showSeries,setShowSeries] = useState(false);
  const movies = useSelector((store) => store.movies);
  const series = useSelector((store) => store.series);
  const showSeries = useSelector((store) => store.config.showSeries);
  const dispatch = useDispatch()
  // console.log(movies);
  usePopularSeries()
  useTopRatedSeries()
  
  const handleShowSeries = () => {
    dispatch(setShowSeries(true))
  }

  return (
    <div className=" bg-black w-screen">
     <div className=" my-3">
     <button className={` ${!showSeries?"border-2 border-red-600 bg-black text-white ":" bg-gray-400"} md:absolute ml-36 md:top-[90%] z-50 px-4 py-2 text-black`} onClick={()=>dispatch(setShowSeries(false))}>Movies</button>

            <button className={` ${showSeries?"border-2 border-red-600 bg-black text-white ":" bg-gray-400"} md:absolute ml-6 md:top-[90%] z-50 px-4 py-2  text-black"`} onClick={handleShowSeries}>Tv Series</button>
          </div>
      {(movies && !showSeries) && (
        <div className="  md:-mt-52 relative z-30">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
          <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}  />
     
        </div>
      )}
      {
        (showSeries && series) && (
          <div className="  md:-mt-52 relative z-30">
          <MovieList title={"Popular Series"} movies={series.popularSeries} />
          <MovieList title={"Top Rated"} movies={series.topRatedSeries} />/
          {/* <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}  /> */}
     
        </div>
        )
      }
    </div>
  );
};

export default SecondaryContainer;
