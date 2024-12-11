import React , {useState} from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import ButtonWarning from '../components/ButtonWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const onClickHandler = async ()=>{
    const data = {
      email,
      password
    }
    const response = await axios.post("http://localhost:3000/api/v1/users/signin", data)
    localStorage.setItem("token", response.data.token)
    navigate("/")
 }
  return (
    <div className='bg-backgroundColor min-h-screen flex justify-center items-center font-serif'>
        <div className='bg-white p-5 flex justify-center items-center flex-col rounded-[10px] w-[380px]'>
        <Heading text={"Sign In"} />
       <SubHeading text={"Enter your credentials to sign in "}/>
       <InputBox text={"Email"} placeholder={"fightclub@gmail.com"} onChange={(e)=>{
        setEmail(e.target.value)
       }}/>
       <InputBox text={"Password"} onChange={(e)=>{
        setPassword(e.target.value)
       }}/>
       <Button text={"Sign In"} onClick={onClickHandler}/>
       <ButtonWarning text={"Don't have an account?"} buttonText={"Signup"} to={"/signup"} />
        </div>
      
    </div>
  )
}

export default Signin
