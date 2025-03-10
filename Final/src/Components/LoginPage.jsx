import React from 'react'
import Login from '../assets/Login.webp'
import { Link } from 'react-router-dom'
import '../Styles/LoginPage.css'
function LoginPage() {
  return (
    <div
    className="login-content"
  >
<div className="overlay">
   <div className='login-form'>
           <h2>Fraud Alert</h2>
           <h4>Sign In</h4>
          <div class="login-input">
            <input type="text" placeholder='Name,Email or Phone' />
            <input type="password" placeholder='password' />
          
          </div>
          <div className='input-different'><button type='submit'>Enter</button></div>
          <p>Forgot Password?</p> 
          <p>Don't have an Account?<Link to='/Register' className='loginin-link'>Register</Link></p>
   </div>
</div>

    </div>
  )
}

export default LoginPage