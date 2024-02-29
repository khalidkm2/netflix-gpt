import React, { useEffect } from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import { useDispatch, useSelector } from 'react-redux'
import { clearTrailerVideo } from '../utils/moviesSlice'

const MainContainer = () => {
    const movies = useSelector((store) => store.movies.nowPlayingMovies)

   


    if(!movies) return
    const mainMovie = movies[2]
    // console.log(mainMovie);

    const {id,overview,original_title} = mainMovie

  return (
    <div>
        <VideoTitle overview={overview} title={original_title} />
        <VideoBackground id={id} fullWidth={true} />
    </div>
  )
}

export default MainContainer