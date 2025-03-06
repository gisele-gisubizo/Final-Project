import { useState } from 'react'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import LoginPage from './Components/LoginPage'
import Register from './Components/Register'
import Home from './Components/Home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <Routes>

<Route path='/' element={<Layout/>}>
<Route path='/Home'  index element={<Home/>}/>


</Route>
<Route path='/LoginPage'  element={<LoginPage/>}/>
<Route path='/Register'  element={<Register/>}/>


     </Routes>
     
     </BrowserRouter>
    </>
  )
}

export default App
