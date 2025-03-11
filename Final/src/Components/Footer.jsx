import React from 'react'
import '../Styles/Footer.css'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
function Footer() {
  return (
    <div className='footer-content'>
 <div className="company">
<h4>DineMate</h4>
<p>Dine Effortlessly, Order Instantly</p>

 </div>

 <div className="company">
<h4>Quick Links</h4>
<ul>
    <li>Menu</li>
    <li>My Orders</li>
    <li>Cart</li>
</ul>

 </div>
 <div className="contact-info">
<h4>Contact</h4>
      <div className="contact-item">
        <FaPhone className="contact-icon" />
        <p>+123 456 7890</p>
      </div>
      <div className="contact-item">
        <FaEnvelope className="contact-icon" />
        <p>info@example.com</p>
      </div>
      <div className="contact-item">
        <FaMapMarkerAlt className="contact-icon" />
        <p>123 Main Street, City, Country</p>
      </div>
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