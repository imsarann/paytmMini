import React from 'react'
import { Link } from "react-router-dom"
function ButtonWarning({text, buttonText, to}) {
  return (
    <div className='font-[100px] text-sm flex justify-center m-1.5'>
    <div >
       {text}
    </div>
    <Link className='pointer underline cursor-pointer pl-1' to={to}>
    {buttonText}
    </Link>

    </div>
  )
}

export default ButtonWarning
