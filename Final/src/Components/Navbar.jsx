import React from 'react'
import '../Styles/Navbar.css'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div className='nav-content'>

<h2>FoodHub</h2>



<div className='nav-list'>
<ul>
   <Link to='/Home' className='Links'><li>Home</li></Link> 
  <Link className='Links'><li>Cart</li></Link>  
  <Link className='Links'><li>My Orders</li></Link>  

</ul>

</div>



    </div>
  )
}

export default Navbar