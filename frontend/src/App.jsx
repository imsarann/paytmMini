import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from './Signup'
import Signin from './Signin'
import Dashboard from './Dashboard'
import SendMoney from './components/SendMoney'
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/" element={<Dashboard/>}/>
        <Route path='transfer' element={<SendMoney/>}/>
      </Routes>
      </BrowserRouter>        
    </>
  )
}

export default App
