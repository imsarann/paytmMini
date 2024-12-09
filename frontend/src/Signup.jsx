import React from 'react'
import './index.css';
import Heading from './components/Heading';
import SubHeading from './components/SubHeading';
import InputBox from './components/InputBox';
import Button from './components/Button';
import ButtonWarning from './components/ButtonWarning';
function Signup() {
  return (
    <div className='min-h-screen bg-backgroundColor flex items-center justify-center font-serif'>
      <div className='bg-white p-3 pl-7 pr-10 rounded-lg w-[400px]'>
        <div className='flex items-center justify-center flex-col'>
        <Heading text={"Sign Up"}/>
        <SubHeading text={"Enter your valid details to signup"}/>
        <InputBox text={" First Name"} placeholder={"Tyler"}/>
        <InputBox text={" Last Name"} placeholder={"Durden"}/>
        <InputBox text={" Email"} placeholder={"fightclub@gmail.com"}/>
        <InputBox text={" Password"} />
        <Button text={"Sign Up"} />
        <ButtonWarning text={"Already have an account? "} buttonText={" Signin"} to={"/signin"} />
        </div>
        
      </div>
    </div>
  )
}

export default Signup
