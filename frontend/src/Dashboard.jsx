import React from 'react'
import Appbar from './components/Appbar'
import Balance from './components/Balance'
import Users from './components/Users'

function Dashboard() {
  return (
    <div>
      <Appbar />
      <Balance/>
      <Users/>
    </div>
  )
}

export default Dashboard
