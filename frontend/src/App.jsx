import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Signin from './Pages/Signin'
import Dashboard from './Pages/Dashboard'
import SendMoney from './components/SendMoney'
import Signup from './Pages/Signup'
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/" element={<Dashboard/>}/>
        <Route path='/transfer' element={<SendMoney/>}/>
      </Routes>
      </BrowserRouter>        
    </>
  )
}

export default App
