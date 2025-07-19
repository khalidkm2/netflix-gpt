import React from "react";
import MovieList from "./MovieList";
import { useDispatch, useSelector } from "react-redux";
import { usePopularSeries } from "../hooks/usePopularSeries";
import { useTopRatedSeries } from "../hooks/useTopRatedSeries";
import { setShowSeries } from "../utils/configSlice";
import ShimmerMovieList from "./ShimmerMovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const series = useSelector((store) => store.series);
  const showSeries = useSelector((store) => store.config.showSeries);
  const dispatch = useDispatch();

  usePopularSeries();
  useTopRatedSeries();

  const handleShowSeries = () => {
    dispatch(setShowSeries(true));
  };

  const handleShowMovies = () => {
    dispatch(setShowSeries(false));
  };

  const isMoviesLoading = !movies?.nowPlayingMovies;
  const isSeriesLoading = !series?.popularSeries;

  return (
    <div className="bg-black w-full px-4 py-6">
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <button
          onClick={handleShowMovies}
          className={`px-4 py-2 rounded-md border-2 text-sm md:text-base font-semibold transition ${
            !showSeries
              ? "border-red-600 bg-black text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          Movies
        </button>
        <button
          onClick={handleShowSeries}
          className={`px-4 py-2 rounded-md border-2 text-sm md:text-base font-semibold transition ${
            showSeries
              ? "border-red-600 bg-black text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          TV Series
        </button>
      </div>

      {/* Movie Lists */}
      {!showSeries && (
        <div className="relative z-30">
          {isMoviesLoading ? (
            <>
              <ShimmerMovieList />
              <ShimmerMovieList />
              <ShimmerMovieList />
            </>
          ) : (
            <>
              <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
              <MovieList title="Top Rated" movies={movies.topRatedMovies} />
              <MovieList title="Upcoming Movies" movies={movies.upcomingMovies} />
            </>
          )}
        </div>
      )}

      {/* Series Lists */}
      {showSeries && (
        <div className="relative z-30">
          {isSeriesLoading ? (
            <>
              <ShimmerMovieList />
              <ShimmerMovieList />
            </>
          ) : (
            <>
              <MovieList title="Popular Series" movies={series.popularSeries} />
              <MovieList title="Top Rated" movies={series.topRatedSeries} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SecondaryContainer;
