import React, { useRef } from 'react'
import { languages } from '../utils/languages'
import { useDispatch, useSelector } from 'react-redux'
import { openai } from '../utils/openAi'
import { API_KEY_OPTIONS } from '../utils/constants'
import { addGptMovies } from '../utils/gptSlice'

const SearchBar = () => {
  const text = useRef(null)
  const dispatch = useDispatch()

  const lang = useSelector((store)=> store.config.lang)

  const searchMovies = async(movieName) => {
    // console.log("insi");
    // console.log(movieName);
    
      const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movieName+'&include_adult=false&language=en-US&page=1', API_KEY_OPTIONS);
  
      const jsonData = await data.json();
      (jsonData);
      return jsonData.results
    };
  

  const getDataGpt = async()=> {
    const query = `Generate movie suggestions for${text.current.value} , separated by commas as like example: Thor,Thugs of Hindustan,Hera Pheri,Man Of Steel,Khalnayak`
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: query }],
      model: "gpt-3.5-turbo",
    });
  
    // console.log(completion?.choices[0]);
    const gptMovies = completion?.choices[0]?.message?.content
    // console.log(gptMovies);
    const gptMoviesList = gptMovies.split(',')
    // console.log(gptMoviesList);
    const allPromises = Promise.all(gptMoviesList.map((movie) => searchMovies(movie)))
    
    allPromises.then((results) => dispatch(addGptMovies({gptMoviesData:results, gptResults:gptMoviesList})))
    // console.log("haha",allPromises);
    
   
  }

  const handleClickGpt = () => {
   getDataGpt()

  }

  return (
    <div className=' pt-[30%] md:pt-[8%] flex justify-center'>
    <form onSubmit={(e) => e.preventDefault()} className=' bg-black text-white w-11/12 md:w-1/2 p-4 grid grid-cols-12'>
        <input ref={text} className='   p-2 text-gray-700 focus col-span-10 rounded-sm' type='text'   />
        <button onClick={handleClickGpt} className=' bg-red-500 text-black py-2 ml-2 col-span-2 rounded-lg'>{languages[lang].search}</button>
    </form>
    </div>
  )
}

export default SearchBar