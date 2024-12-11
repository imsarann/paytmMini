import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import axios from 'axios'

function Dashboard() {
  const [ProfileLetter, setProfileLetter] = useState();
  const [userBalance, setUserBalance] = useState();
  const [userName, setUserName] = useState();
  const getDetails = async ()=>{
    const token = localStorage.getItem("token")
    
    const response = await axios.get("http://localhost:3000/api/v1/users/dashboard", {
      headers :{
        Authorization : `Bearer ${token}`
      }
    })
    setProfileLetter(response.data.firstName.charAt(0))
    setUserName(response.data.firstName);
    setUserBalance(response.data.balance.toFixed(2))
    console.log("🚀 ~ getDetails ~ response:", response)
  }
  useEffect(()=>{
    getDetails();
  }, [])
  return (
    <div className='font-serif'>
      <Appbar text={ProfileLetter}/>
      <div className='ml-5'>
      <Balance value={userBalance}/>
      <Users/>
      </div>
    </div>
  )
}

export default Dashboard
