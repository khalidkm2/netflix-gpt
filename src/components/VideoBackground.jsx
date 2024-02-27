import React from "react";
import { useSelector } from "react-redux";
import { useMovieTrailer } from "../hooks/useMovieTrailer";

const VideoBackground = ({ id ,fullWidth}) => {
  const trailerVideo = useSelector((store) => store?.movies?.trailerVideo);
  console.log(trailerVideo);

  useMovieTrailer(id);

  const widthStyle = fullWidth?'w-screen':'w-[900px]'

  return (
    <div className="">
      {trailerVideo?.key && (
        <iframe

          className={`${widthStyle} aspect-video `}
          src={`https://www.youtube.com/embed/${trailerVideo?.key}?si=soXi1RUlOmp48Te2`+`?&autoplay=1&mute=1`}
          title="YouTube video player"
          allow="accelerometer; allowfullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen></iframe>
      )}
    </div>
  );
};

export default VideoBackground;
