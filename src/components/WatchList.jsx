import React from 'react';
import MovieCard from './MovieCard';
import { useSelector } from 'react-redux';
import { FaRegSadTear } from "react-icons/fa"; // Sad icon for empty state
import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from 'react-router-dom';


const MovieListSearch = () => {
  const watchList = useSelector((store) => store?.movies?.watchList);

  if (!watchList || watchList.length === 0) {
    return (
      <div className="flex relative flex-col items-center justify-center h-screen text-white bg-gray-900">
      <Link to={"/browse"}><MdArrowBackIosNew className='text-white absolute top-8 left-6 text-3xl cursor-pointer' />
</Link>
        <FaRegSadTear className="text-6xl mb-4 text-gray-500" />
        <h2 className="text-2xl font-semibold text-gray-400">Your Watchlist is Empty</h2>
        <p className="text-gray-500">Start adding movies to your watchlist now!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gray-900 p-6">
      <Link to={"/browse"}><MdArrowBackIosNew className='text-white absolute top-8 left-6 text-3xl cursor-pointer' />
</Link>
      <h2 className="text-white text-3xl font-bold mb-6 text-center">My Watchlist</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {watchList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieListSearch;
