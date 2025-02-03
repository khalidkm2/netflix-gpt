import React from 'react'
import { useSelector } from 'react-redux'
import MovieListSearch from './MovieListSearch'


const SearchSuggestion = () => {
  const {gptMovies,gptResults} = useSelector((store) => store.gpt)
  // console.log("gptmovies",gptResults);
  if(!gptResults) return 


  return (
    <div className=' bg-black bg-opacity-80'>
       
      {/* {gptResults.map((movieName,index) => <MovieList key={movieName} title={movieName.original_title} movies={movieName}/>)} */}
      <MovieListSearch title={"Search"} movies={gptResults} />
    </div>
  )
}

export default SearchSuggestion