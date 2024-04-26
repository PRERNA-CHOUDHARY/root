import React from 'react'
import HashLoader from 'react-spinners/HashLoader'

const Loading = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
        <HashLoader color='#a21caf' />
    </div>
  )
}

export default Loading