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
<h4>FoodHub</h4>
<p>Delicious Food Delivered at your Doorstep</p>

 </div>

 <div className="company">
<h4>Quick Links</h4>
<ul>
    <li>Menu</li>
    <li>My Orders</li>
    <li>Cart</li>
</ul>

 </div>

 <div className="company">
<h4>Contact</h4>
<ul>
    <li>+1 234 567 890</li>
    <li>info@foodHub.com</li>
    <li>123 Food Street,Ny</li>
</ul>

 </div>

 <div className='footer-tittle'>
 <h3>Follow Us</h3>
 <br />
 <FaFacebook className="social-icon"/>
<FaXTwitter   className="social-icon"/>
<FaInstagram   className="social-icon"/>
<FaLinkedin  className="social-icon"/>

 </div>

 <div className='copyrights'>
  <p>2025 FoodHub,All Rights reserved</p>

 

  
 </div>




    </div>
  )
}

export default Footer