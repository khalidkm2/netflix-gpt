import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchSuggestion from "./SearchSuggestion";
import { BACKGROUND } from "../utils/constants";
import ShimmerMovieList from "./ShimmerMovieList";

const SearchGptPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen relative text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-50">
        <img
          className="w-full h-full object-cover brightness-50"
          src={BACKGROUND}
          alt="background"
        />
      </div>

      {/* Content above background */}
      <div className="relative z-10">
        <SearchBar setIsLoading={setIsLoading} />
        {isLoading ? <ShimmerMovieList /> : <SearchSuggestion />}
      </div>
    </div>
  );
};

export default SearchGptPage;
