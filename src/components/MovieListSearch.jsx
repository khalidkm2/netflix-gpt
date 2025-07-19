import React from "react";
import MovieCard from "./MovieCard";

const MovieListSearch = ({ title, movies }) => {
  if (!movies || movies.length === 0) {
    return (
      <h2 className="text-white mx-4 pt-3 p-8 font-semibold">No movies found</h2>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-white text-xl font-semibold mb-4">{title}</h2>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieListSearch;
