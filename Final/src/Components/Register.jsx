import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Register.css'
import register from '../assets/register.webp'
function Register() {
  return (
<div
    className="Register-content"
  >
<div className="overlay">
   <div className='register-form'>
           <h2>Fraud Alert</h2>
           <h4>Sign Up</h4>
          <div class="login-input">
            <input type="text" placeholder='First Name'/>  
            <input type="text" placeholder='Last Name' />
            <input type="email" placeholder='Email' />
            <input type="password" placeholder='Password' />
            <input type="password" placeholder='Confirm Password' />
           
          </div>
          <div className='input-different'><button type='submit'>Enter</button></div>
          <p>Already Have an Account?<Link to='/LoginPage' className='register-link'>Sign In</Link></p>
   </div>
</div>

    </div>
  )
}

export default Register