import React from 'react'
import Appbar from './components/Appbar'
import Balance from './components/Balance'
import Users from './components/Users'

function Dashboard() {
  return (
    <div className='font-serif'>
      <Appbar />
      <div className='ml-5'>
      <Balance/>
      <Users/>
      </div>
    </div>
  )
}

export default Dashboard
