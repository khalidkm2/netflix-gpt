import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SearchSuggestion = () => {
  const {gptMovies,gptResults} = useSelector((store) => store.gpt)
  if(!gptResults) return

  console.log(gptResults);

  return (
    <div>
      <h1></h1>
      {gptResults.map((movieName,index) => <MovieList key={movieName} title={movieName} movies={gptMovies[index]?.results}/>)}
    </div>
  )
}

export default SearchSuggestion