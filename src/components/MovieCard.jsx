import React from 'react'
import { IMAGE_URL } from '../utils/constants'

const MovieCard = ({movie}) => {
    const{poster_path} = movie
    if(!poster_path) return
  return (
    <div className=' flex-shrink-0 pr-5 m-4'>
        <img className=' w-40' alt='image' src={IMAGE_URL+poster_path} />
    </div>
  )
}

export default MovieCard