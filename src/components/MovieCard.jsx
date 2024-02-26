import React from 'react'
import { IMAGE_URL } from '../utils/constants'

const MovieCard = ({movie}) => {
  console.log("inside movieCard");
    const{poster_path} = movie
    if(!poster_path) return
  return (
    <div className=' flex-shrink-0 pr-5 m-4'>
        <img className=' md:w-40 w-28' alt='image' src={IMAGE_URL+poster_path} />
    </div>
  )
}

export default MovieCard