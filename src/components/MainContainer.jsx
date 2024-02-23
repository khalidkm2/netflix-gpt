import React from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import { useSelector } from 'react-redux'

const MainContainer = () => {
    const movies = useSelector((store) => store.movies.nowPlayingMovies)
    if(!movies) return
    const mainMovie = movies[2]
    // console.log(mainMovie);

    const {id,overview,original_title} = mainMovie

  return (
    <div>
        <VideoTitle overview={overview} title={original_title} />
        <VideoBackground id={id} />
    </div>
  )
}

export default MainContainer