import React from 'react'

const Genre = ({genre}) => {
  return (
    <div className=' text-white rounded-lg border border-gray-100 hover:bg-slate-500 px-3 py-2 mx-1'>
    {genre}
    </div>
  )
}

export default Genre