import React from 'react'

function Button({text, onClick}) {
  return (
    <div className='mt-5 '>
       <button className='bg-black text-white flex justify-center items-center rounded-[25px] px-8 py-2 text-xl ' onClick={onClick}>
        {text}
        </button>
    </div>
  )
}

export default Button
