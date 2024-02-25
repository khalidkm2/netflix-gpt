import React from 'react'
import SearchBar from './SearchBar'
import SearchSuggestion from './SearchSuggestion'
import { BACKGROUND } from '../utils/constants'

const SearchGptPage = () => {
  return (
    <div>
    <div className="absolute -z-10">
        <img
          className="filter brightness-50"
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