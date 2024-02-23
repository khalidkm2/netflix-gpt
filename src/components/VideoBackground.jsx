import React from "react";
import { useSelector } from "react-redux";
import { useMovieTrailer } from "../hooks/useMovieTrailer";

const VideoBackground = ({ id }) => {
  const trailerVideo = useSelector((store) => store?.movies?.trailerVideo);
  console.log(trailerVideo);

  useMovieTrailer(id);

  return (
    <div className=" w-screen">
      {trailerVideo?.key && (
        <iframe

          className=" w-screen aspect-video  "
          src={`https://www.youtube.com/embed/${trailerVideo?.key}?si=soXi1RUlOmp48Te2`+`?&autoplay=1&mute=1`}
          title="YouTube video player"
          allow="accelerometer; allowfullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen></iframe>
      )}
    </div>
  );
};

export default VideoBackground;
