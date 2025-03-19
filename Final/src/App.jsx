import { useState } from 'react'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import LoginPage from './Components/LoginPage'
import Register from './Components/Register'
import Home from './Components/Home'
import Appetizer from './Components/Appetizer'
import Beverage from './Components/Beverage'
import Menu from './Components/Menu'
import Coffee from './Components/Coffee'
import Smoothie from './Components/Smoothie'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <Routes>

<Route path='/' element={<Layout/>}>
<Route path='/Home'  index element={<Home/>}/>
<Route path='/appetizer'  element={<Appetizer/>}/>
<Route path='/beverage'   element={<Beverage/>}/>
<Route path='/menu'   element={<Menu/>}/>
<Route path='/coffee'  element={<Coffee/>}/>
<Route path='/smoothie'  element={<Smoothie/>}/>



</Route>
<Route path='/LoginPage'  element={<LoginPage/>}/>
<Route path='/Register'  element={<Register/>}/>


     </Routes>
     
     </BrowserRouter>
    </>
  )
}

export default App
