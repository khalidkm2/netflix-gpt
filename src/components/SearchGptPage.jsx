import React from 'react'
import SearchBar from './SearchBar'
import SearchSuggestion from './SearchSuggestion'
import { BACKGROUND } from '../utils/constants'

const SearchGptPage = () => {
  return (
    <div>
    <div className="fixed -z-10">
        <img
          className="filter brightness-50 h-screen object-cover md:h-full "
          src={BACKGROUND}
          alt="background"
        />
      </div>
    <SearchBar/>
    <SearchSuggestion/>
    </div>
  )
}

export default SearchGptPage