import React from 'react'
import { languages } from '../utils/languages'
import { useSelector } from 'react-redux'

const SearchBar = () => {

  const lang = useSelector((store)=> store.config.lang)
  console.log(lang);

  return (
    <div className=' pt-[10%] flex justify-center'>
    <form className=' bg-black text-white w-1/2 p-4 grid grid-cols-12'>
        <input className=' border border-gray-500  text-black col-span-10 rounded-sm' type='text'   />
        <button className=' bg-red-500 text-black py-2 ml-2 col-span-2 rounded-lg'>{languages[lang].search}</button>
    </form>
    </div>
  )
}

export default SearchBar