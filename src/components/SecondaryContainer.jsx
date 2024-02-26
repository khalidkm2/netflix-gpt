import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  // console.log(movies);
  

  return (
    <div className=" bg-black">
      {movies && (
        <div className="  md:-mt-52 relative z-30">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}  />
     
        </div>
      )}
    </div>
  );
};

export default SecondaryContainer;
