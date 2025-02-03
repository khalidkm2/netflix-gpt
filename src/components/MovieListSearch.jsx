import React from 'react';
import MovieCard from './MovieCard';

const MovieListSearch = ({title, movies}) => {
  console.log("inside MovieList:", movies); // Check if movies prop is correctly passed
  if(movies?.length <= 0){
    return (        <h2 className='text-white mx-4 pt-3 p-8 font-semibold'>No movies found</h2>
    )
  }
  return (
    <div className=''>
        <h2 className='text-white mx-4 pt-3 font-semibold'>{title}</h2>
        <div className='flex flex-wrap'>
        {movies && movies.map((movie) => {
          {/* console.log("movie id:", movie.id); // Check if each movie has an id */}
          return <MovieCard key={movie.id} movie={movie} />;
        })}
        </div>
    </div>
  );
};

export default MovieListSearch;
