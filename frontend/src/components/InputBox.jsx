import React from 'react'

function InputBox({text, placeholder, onChange}) {
  return (
        <div>
      <div className='font-medium text-left py-2'>
            {text}
          </div>
            <div className='pl-1 pt-1 '>
            <input className='box-border border border-gray-400 rounded-[8px] p-1 w-[290px]' placeholder={placeholder} onChange={onChange}  /> 
            </div>
        </div>
  )
}

export default InputBox
