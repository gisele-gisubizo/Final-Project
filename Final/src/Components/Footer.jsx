import React from 'react'
import '../Styles/Footer.css'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
function Footer() {
  return (
    <div className='footer-content'>
 <div className="company">
<h4>Company</h4>
<ul>
    <li>Home</li>
    <li>Message</li>
    <li>Notification</li>
    <li>Explore</li>
</ul>

 </div>

 <div className="company">
<h4>Resources</h4>
<ul>
    <li>Privacy Policy</li>
    <li>Terms and Conditions</li>
    <li>Blog</li>
    <li>Contact Us</li>
</ul>

 </div>

 <div className="company">
<h4>Partners</h4>
<ul>
    <li>RIB</li>
    <li>National Policy</li>
    <li>NSA</li>
    <li>GardaWorld</li>
</ul>

 </div>

 <div className='footer-tittle'>
 <h3>Fraud Alert</h3>
 <br />
 <p>Stay Alert, Stay Safe – Expose Scams, Protect Society</p>
 <FaFacebook className="social-icon"/>
<FaXTwitter   className="social-icon"/>
<FaInstagram   className="social-icon"/>
<FaLinkedin  className="social-icon"/>

 </div>

 <div className='copyrights'>
  <p>Copyright @2025</p>

 

  
 </div>




    </div>
  )
}

export default Footer