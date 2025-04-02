import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoRestaurant } from "react-icons/io5";
import { FaSun, FaMoon } from "react-icons/fa6";
import { ThemeContext } from '../context/ThemeContext'; // Import Theme Context
import '../Styles/Navbar.css';

function Navbar() {
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext); // Use global Dark Mode
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('tableNumber');

        // Redirect to Login page
        navigate('/LoginPage');
    };

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
                    <Link to='/LoginPage' onClick={handleLogout} className='Links'>
                        <li>Logout</li>
                    </Link>  
                </ul>
            </div>
            <div className="dark-mode-toggle" onClick={toggleDarkMode}>
                {isDarkMode ? <FaSun className="icon" /> : <FaMoon className="icon" />}
            </div>
        </div>
    );
}

export default Navbar;
