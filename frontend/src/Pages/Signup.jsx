import React from 'react'
import InputBox from '../components/InputBox';
import ButtonWarning from '../components/ButtonWarning';
import Button from '../components/Button';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Signup() {
  const navigate = useNavigate()
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onClickHandler =  async () =>{
      const data = {
        firstName,
        lastName,
        email,
        password
      }
      console.log("🚀 ~ Signup ~ data:", data)
      const response = await axios.post("http://localhost:3000/api/v1/users/signup",data)
      localStorage.setItem("token", response.data.token)
      navigate("/")

    }

  return (
    <div className='min-h-screen bg-backgroundColor flex items-center justify-center font-serif'>
      <div className='bg-white p-3 pl-7 pr-10 rounded-lg w-[400px]'>
        <div className='flex items-center justify-center flex-col'>
        <Heading text={"Sign Up"}/>
        <SubHeading text={"Enter your valid details to signup"}/>
        <InputBox text={" First Name"} placeholder={"Tyler"}  onChange={(e)=>{
            setFirstName(e.target.value)
        }}/>
        <InputBox text={" Last Name"} placeholder={"Durden"} onChange={(e)=>{
            setLastName(e.target.value)
        }}/>
        <InputBox text={" Email"} placeholder={"fightclub@gmail.com"} onChange={(e)=>{
            setEmail(e.target.value)
        }}/>
        <InputBox text={" Password"} onChange={(e)=>{
            setPassword(e.target.value)
        }}/>
        <Button text={"Sign Up"} onClick={onClickHandler}/>
        <ButtonWarning text={"Already have an account? "} buttonText={" Signin"} to={"/signin"} />
        </div>
        
      </div>
    </div>
  )
}

export default Signup
