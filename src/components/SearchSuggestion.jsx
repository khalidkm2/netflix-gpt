import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SearchSuggestion = () => {
  const {gptMovies,gptResults} = useSelector((store) => store.gpt)
  if(!gptResults) return

  // console.log(gptResults);

  return (
    <div className=' bg-black bg-opacity-80'>
     
      {gptResults.map((movieName,index) => <MovieList key={movieName} title={movieName} movies={gptMovies[index]}/>)}
    </div>
  )
}

export default SearchSuggestion