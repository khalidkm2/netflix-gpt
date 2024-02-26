import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({title, movies}) => {
  // console.log("inside MovieList:", movies); // Check if movies prop is correctly passed
  
  return (
    <div>
        <h2 className='text-white mx-4 pt-3 font-semibold'>{title}</h2>
        <div className='flex overflow-x-scroll scroll-p-0'>
        {movies && movies.map((movie) => {
          {/* console.log("movie id:", movie.id); // Check if each movie has an id */}
          return <MovieCard key={movie.id} movie={movie} />;
        })}
        </div>
    </div>
  );
};

export default MovieList;
