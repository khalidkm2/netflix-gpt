import React, { useRef, useState } from "react";
import { languages } from "../utils/languages";
import { useDispatch, useSelector } from "react-redux";
import { openai } from "../utils/openAi";
import { API_KEY_OPTIONS, OPENAI_KEY } from "../utils/constants";
import { addGptMovies } from "../utils/gptSlice";
import { ColorRing } from "react-loader-spinner";
import OpenAI from "openai";
import { CiSearch } from "react-icons/ci";
import { Oval } from "react-loader-spinner";



const SearchBar = () => {
  const text = useRef(null);
  const dispatch = useDispatch();
  const [isLoading,setisLoading ] = useState(false);

  const lang = useSelector((store) => store.config.lang);
  const { gptMovies, gptResults } = useSelector((store) => store.gpt);

  const searchMovies = async (movieName) => {
    setisLoading(true)
    const url =
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDRiNTQ0MmZhMWNhMWUxYzY4ODA0OGE0OWQzMjlkZCIsInN1YiI6IjY1ZDgwOTVjMWJmODc2MDE4N2JlOTBkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ghzkiudK3kdOW4Vah-qSdil_LpsVEVh5L8AmZpZpOQ",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        dispatch(addGptMovies({gptMoviesData:json.results, gptResults:json.results}))
        setisLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setisLoading(false)
      });

  };

  const getDataGpt = async () => {
    const query = `Generate movie suggestions for${text.current.value} , separated by commas as like example: Thor,Thugs of Hindustan,Hera Pheri,Man Of Steel,Khalnayak. don't write extra word like here are some and don't write /n`;
  };

  const handleClickGpt = () => {
    // getDataGpt();
    searchMovies(text.current.value);
    // setLoader(true);
    if (!gptResults) {
      setisLoading(false);
    }
  };

  return (
    <div className=" pt-[30%] md:pt-[8%] flex justify-center">

      <form
        onSubmit={(e) => e.preventDefault()}
        className="  text-white w-11/12 md:w-1/2 p-4 grid grid-cols-12"
      >
        <input
          ref={text}
          placeholder="eg. action,comedy movie"
          className=" mt-20  p-2 text-gray-700 focus col-span-10 rounded-sm"
          type="text"
        />
        <button
          onClick={handleClickGpt}
          className=" mt-20 bg-red-500 text-black py-2 ml-2 col-span-2 rounded-lg"
        >
        {isLoading? <div className=" ml-8"><Oval height={30} color="white" width={30} /></div>: <CiSearch className=" text-3xl mx-auto" />}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
