import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGptMovies } from "../utils/gptSlice";
import { CiSearch } from "react-icons/ci";
import { Oval } from "react-loader-spinner";

const SearchBar = ({ setIsLoading }) => {
  const text = useRef(null);
  const dispatch = useDispatch();
  const { gptResults } = useSelector((store) => store.gpt);

  const searchMovies = async (movieName) => {
    setIsLoading(true);
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
  const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDRiNTQ0MmZhMWNhMWUxYzY4ODA0OGE0OWQzMjlkZCIsInN1YiI6IjY1ZDgwOTVjMWJmODc2MDE4N2JlOTBkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ghzkiudK3kdOW4Vah-qSdil_LpsVEVh5L8AmZpZpOQ",
      },
    };

    try {
      const res = await fetch(url, options);
      const json = await res.json();
      dispatch(addGptMovies({ gptMoviesData: json.results, gptResults: json.results }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickGpt = () => {
    if (text.current?.value) {
      searchMovies(text.current.value);
    }
  };

  return (
    <div className="pt-[30%] md:pt-[10%] mt-8 flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-11/12 md:w-2/3 lg:w-1/2 grid grid-cols-12 gap-2"
      >
        <input
          ref={text}
          placeholder="e.g. action, comedy movie"
          className="col-span-9 md:col-span-10 p-2 rounded-md text-gray-800"
          type="text"
        />
        <button
          onClick={handleClickGpt}
          className="col-span-3 md:col-span-2 bg-red-500 text-black rounded-md flex items-center justify-center"
        >
          <CiSearch className="text-2xl" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
