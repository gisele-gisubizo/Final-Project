import React, { useState, useEffect, useContext } from 'react';
import { FaBurger, FaWineGlass, FaIceCream, FaPizzaSlice } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import eat1 from '../assets/eat1.jpeg';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext
import '../Styles/Home.css';

function Home() {
    const { isDarkMode } = useContext(ThemeContext); // Get dark mode state from context
    const [cart, setCart] = useState([]);
    const [popularDishes, setPopularDishes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch("http://localhost:5000/HomeItem/home");
                if (!response.ok) {
                    throw new Error("Failed to fetch dishes");
                }
                const data = await response.json();
                console.log("API Response:", data);

                // Ensure data contains homeItems array
                const dishes = data.homeItems;
                if (Array.isArray(dishes)) {
                    setPopularDishes(dishes);
                } else {
                    throw new Error("API response does not contain an array of dishes");
                }
            } catch (error) {
                console.error("Error fetching dishes:", error);
            }
        };

        fetchDishes();
    }, []); // Empty dependency array to fetch only once

    const handleAddToCart = (dish) => {
        setCart((prevCart) => [...prevCart, dish]);
        window.scrollTo(0, document.body.scrollHeight);
    };

    const handleRemoveFromCart = (dishIndex) => {
        setCart((prevCart) => prevCart.filter((_, index) => index !== dishIndex));
    };

    const handleViewOrders = () => {
        localStorage.setItem("cartItems", JSON.stringify(cart));
        navigate("/MyOrders");
    };

    return (
        <div className={`home-real-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="home-container">
                <div className="home-part1">
                    <h3>Welcome to DineMate</h3>
                    <p>Dine Effortlessly, Order Instantly.</p>
                </div>
                <div className="home-image">
                    <img src={eat1} alt="Dining" />
                </div>
                <div className="home-button">
                    <button type="submit" className="view-menu-btn">
                        <Link to="/Menu" className="Links-home-menu">View Menu</Link>
                    </button>
                </div>
            </div>

            <div className="home-part2">
                <div className="main">
                    <FaBurger className="icon" />
                    <Link to="/Home" className="Links-home"><p>Main Course</p></Link>
                </div>

                <div className="appetizers">
                    <FaPizzaSlice className="icon" />
                    <Link to="/Appetizer" className="Links-home"><p>Appetizers</p></Link>
                </div>

                <div className="beverages">
                    <FaWineGlass className="icon" />
                    <Link to="/Beverage" className="Links-home"><p>Beverages</p></Link>
                </div>

                <div className="desserts">
                    <FaIceCream className="icon" />
                    <Link to="/Desserts" className="Links-home"><p>Desserts</p></Link>
                </div>
            </div>

            <h2 className="popular-dishes-title">Popular Dishes</h2>
            <div className="popular-dishes-container">
                {Array.isArray(popularDishes) && popularDishes.length > 0 ? (
                    popularDishes.map((dish, index) => (
                        <div key={index} className="dish-item">
                            <img src={dish.image} alt={dish.name} className="dish-img" />
                            <h3 className="dish-name">{dish.name}</h3>
                            <p className="dish-description">{dish.description || 'No description available'}</p>
                            <p className="dish-price">${(dish.price || 0).toFixed(2)}</p>
                            <button className="add-to-cart-btn" onClick={() => handleAddToCart(dish)}>
                                Add to Cart
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No popular dishes available.</p>
                )}
            </div>

            <div className="cart-section">
                <h2>Your Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div>
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-img" />
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>${(item.price || 0).toFixed(2)}</p>
                                </div>
                                <button 
                                    className="remove-from-cart-btn"
                                    onClick={() => handleRemoveFromCart(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <p>Total: ${cart.reduce((total, item) => total + (item.price || 0), 0).toFixed(2)}</p>
                    </div>
                )}
            </div>

            {/* Conditionally render the "View in My Orders" button */}
            {cart.length > 0 && (
                <div className="view-my-orders-btn">
                    <button onClick={handleViewOrders}>View in My Orders</button>
                </div>
            )}
        </div>
    );
}

export default Home;
