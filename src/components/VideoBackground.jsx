import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMovieTrailer } from "../hooks/useMovieTrailer";
import { clearTrailerVideo } from "../utils/moviesSlice";

const VideoBackground = ({ id, fullWidth }) => {
  const trailerVideo = useSelector((store) => store?.movies?.trailerVideo);
  const dispatch = useDispatch();

  useMovieTrailer(id);

  // Width control
  const widthStyle = fullWidth
    ? "w-full"
    : "w-[90%] sm:w-[600px] md:w-[700px] lg:w-[900px]";

  return (
    <div className="flex justify-center items-center mx-auto">
      {trailerVideo?.key && (
        <iframe
          className={`${widthStyle} aspect-video rounded-md shadow-lg`}
          src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default VideoBackground;
