import React from 'react'

function Appbar({text}) {
  return (
    <div className='flex justify-between border p-1 m-0'>
      <div className='text-[18px] font-medium'>
        PayTM App
      </div>
      <div className='flex justify-center '>
        <div className='p-1'>Hello</div>
        <div className='px-3 text-[25px] bg-slate-300 rounded-[300px] mx-1'>
        {text}
        </div>
      </div>
    </div>
  )
}

export default Appbar
