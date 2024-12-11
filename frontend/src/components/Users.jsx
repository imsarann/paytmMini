import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
function Users() {
  const navigate = useNavigate()
  const [Users, setUsers] = useState(null);
  const getUsers = async (filter) => {
    const token = localStorage.getItem("token");
    if(filter.trim() === ""){
        setUsers(null);
        console.log("hello inside empty string")
        return;
    }
    const response = await axios.get(
      `http://localhost:3000/api/v1/users/bulk?filter=${filter}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUsers(response.data.users);
  };
  const onClickHandle = (user) =>{
    navigate("/transfer", { state :{ user }})
      }
  return (
    <div>
      <div className="font-bold text-lg mt-6">Users</div>
      <input
        type="text"
        className="border w-full px-2 py-1 rounded border-slate-200"
        placeholder="Search users..."
        onChange={(e) => {
          console.log(e.target.value)
          getUsers(e.target.value);
        }}
      />
      {Users && Users.map((user, index) => (
          <div className="flex justify-between" key={index}>
            <div className="flex m-3">
              <div className="bg-slate-300 text-lg px-2.5 rounded-full">S</div>
              
              <div className="mt-1 ml-4">
                {user.firstName + " "} 
                {user.lastName}
              </div>
            </div>
            <div>
              <button className="bg-black text-white font-medium rounded-lg px-2 py-1 mt-2" onClick={()=>{onClickHandle(user)}}>
                Send Money
              </button>
            </div>
          </div>
        ))
        }
    </div>
  );
}

export default Users;
