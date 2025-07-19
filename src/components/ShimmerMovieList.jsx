// components/ShimmerMovieList.jsx
import React from "react";

const ShimmerMovieList = () => {
  return (
    <div className="px-4 py-6">
      <div className="h-6 w-32 bg-gray-700 animate-pulse mb-4 rounded"></div>
      <div className="flex overflow-x-auto gap-4">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="w-40 h-60 bg-gray-800 rounded-md animate-pulse" />
        ))}
      </div>
    </div>
  );
};

export default ShimmerMovieList;
