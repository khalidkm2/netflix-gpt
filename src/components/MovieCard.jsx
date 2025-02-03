import React from 'react';
import { IMAGE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa"; // Unfilled bookmark
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist } from '../utils/moviesSlice';

const MovieCard = ({ movie }) => {
  const { poster_path, id } = movie;
  const dispatch = useDispatch();
  const watchList = useSelector((state) => state.movies.watchList); // Get watchlist from Redux
  
  if (!poster_path) return null;

  // Check if the movie is in the watchlist
  const isAdded = watchList.some((item) => item.id === id);

  const handleToggleWatchList = () => {
    dispatch(addToWatchlist(movie)); // Dispatch action (toggles movie)
  };

  return (
    <div className="relative flex-shrink-0 pr-5 m-4 cursor-pointer hover:scale-105 duration-200 ease-in">
      <div className="relative overflow-hidden group rounded-lg">
        <img className="md:w-40 w-28 rounded-lg transition-opacity duration-300 group-hover:opacity-35" 
             alt='Movie Poster' 
             src={IMAGE_URL + poster_path} />
        
        {/* Overlay with Buttons */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col items-center space-y-2">
            <Link to={`/movie-info/${id}`} className="bg-white text-black px-4 py-2 text-sm rounded-md hover:bg-gray-200">See details</Link>
            <button 
              onClick={handleToggleWatchList} 
              className="bg-red-600 text-white px-4 py-2 text-sm rounded-md hover:bg-red-700 transition-transform duration-100"
            >
              {isAdded ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
