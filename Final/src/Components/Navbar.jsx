import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoRestaurant } from "react-icons/io5";
import { FaSun, FaMoon } from "react-icons/fa6";
import { ThemeContext } from '../context/ThemeContext'; // Import Theme Context
import '../Styles/Navbar.css';

function Navbar() {
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext); // Use global Dark Mode

    return (
        <div className={`navbar-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <h2>
                <IoRestaurant className="restaurant-icon" /> DineMate
            </h2>
            <div className='nav-list'>
                <ul>
                    <Link to='/Home' className='Links'><li>Home</li></Link> 
                    <Link to='/MyOrders' className='Links'><li>My Orders</li></Link> 
                    <Link to='/Kitchen' className='Links'><li>Kitchen</li></Link>  
                </ul>
            </div>
            <div className="dark-mode-toggle" onClick={toggleDarkMode}>
                {isDarkMode ? <FaSun className="icon" /> : <FaMoon className="icon" />}
            </div>
        </div>
    );
}

export default Navbar;
