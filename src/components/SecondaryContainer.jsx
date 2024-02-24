import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies)
  console.log(movies);


  return (
    <div className=' bg-black'>
    <div className=' -mt-52 relative z-30'>
    <MovieList title={"Now Playing"} movies={movies}  />
      <MovieList title={"Popular"} movies={movies}  />
      <MovieList title={"New Releases"} movies={movies}  />
      <MovieList title={"Top Rating"} movies={movies}  />
    </div>
     

    </div>
  )
}

export default SecondaryContainer