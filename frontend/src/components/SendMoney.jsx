import React from 'react'

export default function SendMoney() {
  return (
    <div>
       <div className='bg-backgroundColor min-h-screen flex justify-center items-center font-serif'>
        <div className=' flex flex-col justify-center items-center- bg-white w-[600px] h-[500px] p-9 rounded-xl border border-gray-400' >
            <div className='flex justify-center mb-[90px]'>
            <div className='font-extrabold text-[40px]'>Send Money</div>
            </div>
            <div className='flex'>
                <span className='bg-green-600 p-1 rounded-full px-3 text-lg m-1 '>A</span>
                <div className='text-[28px] p-1 ml-2'>Friend's Name</div>
            </div>
            <div className='text-lg'>Amount(in Rs)</div>
            <div className='flex flex-col'>
            <input placeholder='Enter Amount' className='p-1 text-xl border rounded-sm mt-4'></input>
            <button className='bg-green-600 mt-3 text-xl p-3 text-white rounded-md'>Initiate Transfer</button>
            </div>
        </div>
       </div>
    </div>
  )
}
