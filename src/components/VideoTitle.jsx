import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className=' w-full aspect-video pt-[20%] px-10  absolute bg-gradient-to-r from-black text-gray-300 '>
        <h1 className='text-2xl md:text-3xl font-bold'>{title}</h1>
        <p className=' hidden md:block w-1/4 text-sm'>{overview}</p>
        <div>
            <button className=' text-xs md:text-base py-3 my-4 md:px-8 px-5 rounded-sm bg-white text-black font-bold hover:bg-opacity-90'>▶️ Play</button>
            <button className=' hidden md:inline-block py-3 my-4 px-10 ml-3 rounded-sm bg-gray-400 text-white font-bold hover:bg-opacity-90 bg-opacity-50'>More info</button>
        </div>
    </div>
  )
}

export default VideoTitle