import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMovieInfo } from "../hooks/useMovieInfo";
import { useDispatch, useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import { IMAGE_URL } from "../utils/constants";
import Genre from "./Genre";
import MovieCreaters from "./MovieCreaters";
import { MdArrowBackIosNew } from "react-icons/md";

const MovieInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showSeries = useSelector((store) => store.config.showSeries);
  const titleName = showSeries ? "tv" : "movie";

  useMovieInfo(id, titleName);
  const movieInfo = useSelector((store) => store.movies.movieInfo);

  if (!movieInfo) return null;

  const {
    runtime,
    title,
    release_date,
    poster_path,
    genres,
    overview,
    production_companies,
  } = movieInfo;

  return (
    <div className="bg-[#0a0811] text-white min-h-screen">
      {/* Back Button */}
      <div className="bg-black p-4">
        <Link to="/browse">
          <MdArrowBackIosNew className="text-white text-3xl cursor-pointer" />
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Title Info */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 mb-2">
            {title}
          </h1>
          <div className="text-gray-300 space-x-4">
            <span>
              <span className="font-semibold">Released:</span> {release_date}
            </span>
            <span>
              <span className="font-semibold">Runtime:</span> {runtime} min
            </span>
          </div>
        </div>

        {/* Poster & Trailer */}
        <div className="flex flex-col lg:flex-row items-center gap-6 mb-10">
          <img
            className="w-[220px] sm:w-[300px] rounded-md shadow-md"
            alt={title}
            src={IMAGE_URL + poster_path}
          />
          <div className="w-full hidden lg:block">
            <VideoBackground fullWidth={false} id={id} />
          </div>
        </div>

        {/* Genres and Overview */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {genres?.map((genre) => (
              <Genre key={genre.id} genre={genre.name} />
            ))}
          </div>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            <span className="block text-gray-400 mb-1 font-semibold">Overview</span>
            {overview}
          </p>
          <hr className="my-6 border-gray-600 opacity-50" />
        </div>

        {/* Production Companies */}
        <h2 className="text-2xl sm:text-3xl font-bold text-red-600 text-center mb-8">
          Production Companies
        </h2>
        <div className="flex flex-wrap justify-center gap-10 pb-20">
          {production_companies?.map((info) => (
            <MovieCreaters key={info.id} info={info} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
