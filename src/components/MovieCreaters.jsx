import React from "react";
import { IMAGE_URL } from "../utils/constants";

const MovieCreaters = ({ info }) => {
  const { name, logo_path } = info;

  return (
    <div className="text-center max-w-xs">
      <p className="text-gray-300 font-semibold text-lg mb-2">{name}</p>
      {logo_path && (
        <img
          src={IMAGE_URL + logo_path}
          alt={name}
          className="max-w-[180px] mx-auto bg-white rounded-md p-4"
        />
      )}
    </div>
  );
};

export default MovieCreaters;
