import React from 'react'
import '../Styles/Navbar.css'
function Navbar() {
  return (
    <div className='nav-content'>
<div className='nav-input'> 
<input type="text" placeholder='search..' />
</div>


<div className='nav-list'>
<ul>
    <li>Home</li>
    <li>Messages</li>
    <li>Notification</li>
    <li>Explore</li>
    <li>Profile</li>
</ul>

</div>



    </div>
  )
}

export default Navbar