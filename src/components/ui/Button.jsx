import React from 'react'

const Button = ({btnName = 'button', onClick}) => {
  return (
      <button onClick={onClick} className=' border-2 border-violet-600 p-2 m-0.5 rounded-md font-bold bg-blue-950  hover:bg-violet-600 hover:border-white'>{btnName}</button>
  )
}

export default Button
