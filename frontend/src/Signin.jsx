import React from 'react'
import Heading from './components/Heading'
import SubHeading from './components/SubHeading'
import InputBox from './components/InputBox'
import Button from './components/Button'
import ButtonWarning from './components/ButtonWarning'

function Signin() {
  return (
    <div className='bg-backgroundColor min-h-screen flex justify-center items-center font-serif'>
        <div className='bg-white p-5 flex justify-center items-center flex-col rounded-[10px] w-[380px]'>
        <Heading text={"Sign In"} />
       <SubHeading text={"Enter your credentials to sign in "}/>
       <InputBox text={"Email"} placeholder={"fightclub@gmail.com"}/>
       <InputBox text={"Password"} />
       <Button text={"Sign In"}/>
       <ButtonWarning text={"Don't have an account?"} buttonText={"Signup"} to={"/signup"} />
        </div>
      
    </div>
  )
}

export default Signin
