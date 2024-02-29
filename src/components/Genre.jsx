import React from 'react'

const Genre = ({genre}) => {
  return (
    <div className=' text-black font-bold bg-white rounded-lg border border-gray-100 hover:opacity-75 cursor-pointer px-3 py-2 mx-1'>
    {genre}
    </div>
  )
}

export default Genre