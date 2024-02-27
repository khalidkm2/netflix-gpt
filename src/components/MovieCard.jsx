import React from 'react'
import { IMAGE_URL } from '../utils/constants'
import { Link } from 'react-router-dom';

const MovieCard = ({movie}) => {
  // console.log("inside movieCard");
    const{poster_path,id} = movie
    if(!poster_path) return
    // console.log(movie);
  return (
    <Link className=' flex-shrink-0 pr-5 m-4 cursor-pointer' to={"/movie-info/"+id}>
 <div className=''>
        <img className=' md:w-40 w-28' alt='image' src={IMAGE_URL+poster_path} />
    </div>
    </Link>
   
  )
}

export default MovieCard