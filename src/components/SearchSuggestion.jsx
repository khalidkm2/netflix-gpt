import React from "react";
import { useSelector } from "react-redux";
import MovieListSearch from "./MovieListSearch";

const SearchSuggestion = () => {
  const { gptResults } = useSelector((store) => store.gpt);

  if (!gptResults) return null;

  return (
    <div className="bg-black bg-opacity-80 mt-10">
      <MovieListSearch title={"Search Results"} movies={gptResults} />
    </div>
  );
};

export default SearchSuggestion;
