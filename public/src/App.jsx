import { useState } from 'react' 
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Chat from "./pages/Chat"
import SetAvatar from './pages/SetAvatar'

function App() {
  const [count, setCount] = useState(0)

  return (
     <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Chat/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/setAvatar' element={<SetAvatar/>} />
     </Routes>
     </BrowserRouter>

     </>
  )
}

export default App
