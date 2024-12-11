import axios from 'axios';
import React , {useState}from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SendMoney() {
  const [amount, setAmount] = useState();
  const location = useLocation();
  const { user } = location.state || {};
  const letter = user.firstName.split("")[0];
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate()
  const onClickHandle = async () =>{
    const token = localStorage.getItem("token")
    if(!amount || isNaN(amount) || parseFloat(amount) <= 0){
      alert("Enter valid Numericals")
      return;
    }
    const data = {
      to : user._id,
      amount
    }
    console.log("before axiossssss")
    try{
      const response = await axios.post("http://localhost:3000/api/v1/account/transfer",data,
        {
          headers : {
            Authorization : `Bearer ${token}` 
          }
        }
      )
      setShowSuccess(true);
    }catch(err){
      if(err.response){
        if(err.response.status === 400){
          alert("Invalid Inputs" + err.response.data.message)
        }
      }
    }
    
  }
  return (
    <div>
       <div className='bg-backgroundColor min-h-screen flex justify-center items-center font-serif'>
        <div className=' flex flex-col justify-center items-center- bg-white w-[600px] h-[500px] p-9 rounded-xl border border-gray-400' >
            <div className='flex justify-center mb-[90px]'>
            <div className='font-extrabold text-[40px]'>Send Money</div>
            </div>
            <div className='flex'>
                <span className='bg-green-600 p-1 rounded-full px-3.5 text-xl m-1 '>{letter}</span>
                <div className='text-[28px] p-1 ml-2'>{user.firstName + " "}{user.lastName}</div>
            </div>
            <div className='text-lg'>Amount(in Rs)</div>
            <div className='flex flex-col'>
            <input placeholder='Enter Amount' className='p-1 text-xl border rounded-sm mt-4' onChange={(e)=>{
                  setAmount(e.target.value)
            }}></input>
            <button className='bg-green-600 mt-3 text-xl p-3 text-white rounded-md' onClick={()=>{
              onClickHandle();
            }}>Initiate Transfer</button>
            </div>
            {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-green-600 text-2xl font-bold mb-4">
              Transfer Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              Rs {amount} has been successfully transferred to{" "}
              {user ? `${user.firstName} ${user.lastName}` : "your friend"}.
            </p>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md"
              onClick={() => {setShowSuccess(false) 
                navigate("/")
              }
              }
            >
              Close
            </button>
          </div>
        </div>
      )}
        </div>
       </div>
    </div>
  )
}
