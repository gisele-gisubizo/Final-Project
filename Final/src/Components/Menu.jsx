import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../Styles/Menu.css';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

function Menu() {
    const [mainCourses, setMainCourses] = useState([]);
    const [appetizers, setAppetizers] = useState([]);
    const [beverages, setBeverages] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/MenuItem/menu');
                const menuItems = response.data.menuItems || response.data;

                if (Array.isArray(menuItems)) {
                    setMainCourses(menuItems.filter(item => item.category === "Main Course"));
                    setAppetizers(menuItems.filter(item => item.category === "Appetizer"));
                    setBeverages(menuItems.filter(item => item.category === "Beverage"));
                    setDesserts(menuItems.filter(item => item.category === "Dessert"));
                } else {
                    throw new Error('Unexpected data format: menuItems is not an array');
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch menu items');
            } finally {
                setLoading(false);
            }
        };
        fetchMenuItems();
    }, []);

    const handleAddToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
        window.scrollTo(0, document.body.scrollHeight);
    };

    const handleRemoveFromCart = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    const renderMenuItems = (categoryName, items) => (
        items.length > 0 && (
            <div className="category">
                <h2>{categoryName}</h2>
                <div className="menu-items">
                    {items.map((item) => (
                        <div key={item._id} className="menu-item">
                            <img src={item.image} alt={item.name} className="menu-img" />
                            <div className="menu-details">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p className="category-menu">{item.category}</p>
                                <p className="price">${parseFloat(item.price.replace('$', '')).toFixed(2)}</p>
                                <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    );

    return (
        <div className="menu-container">
            <h1>Our Menu</h1>
            {loading && <p>Loading menu items...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {!loading && !error && (
                <>
                    {renderMenuItems("Appetizers", appetizers)}
                    {renderMenuItems("Main Course", mainCourses)}
                    {renderMenuItems("Beverages", beverages)}
                    {renderMenuItems("Desserts", desserts)}
                </>
            )}

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
                                    <p>${parseFloat(item.price.replace('$', '')).toFixed(2)}</p>
                                </div>
                                <button className="remove-from-cart-btn" onClick={() => handleRemoveFromCart(index)}>Remove</button>
                            </div>
                        ))}
                        <p>Total: ${cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Menu;
