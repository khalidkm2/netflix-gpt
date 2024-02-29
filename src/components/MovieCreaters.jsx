import React from 'react'
import { IMAGE_URL } from '../utils/constants'

const MovieCreaters = ({info}) => {
    
   const{name,logo_path} = info;
//    if(!logo)
  return (
    <div>
    <p className=' text-gray-500 text-lg font-bold py-4 '>{name}</p>
    {logo_path && (<div>
   <img
            className=" max-w-[200px] bg-gray-100 p-10"
            alt="image"
            src={IMAGE_URL + logo_path}
          />
   </div>)}
    </div>
  )
}

export default MovieCreaters