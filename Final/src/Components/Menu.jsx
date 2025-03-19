import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../Styles/Menu.css';

function Menu() {
    // State for each category
    const [starters, setStarters] = useState([]);
    const [mainCourses, setMainCourses] = useState([]);
    const [appetizers, setAppetizers] = useState([]);
    const [beverages, setBeverages] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [error, setError] = useState(null);

    // Fetch data when component mounts
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                // Fetch all menu items - Matches the new backend route
                const response = await axios.get('http://localhost:5000/MenuItem/menu');
                console.log('Response data:', response.data); // Log the response to inspect it

                // Handle the response based on your backend structure
                const menuItems = response.data.menuItems || response.data; // Use menuItems if wrapped, or raw data if not

                // Check if menuItems is an array before filtering
                if (Array.isArray(menuItems)) {
                    setStarters(menuItems.filter(item => item.category === "Appetizers"));
                    setMainCourses(menuItems.filter(item => item.category === "Main Course"));
                    setAppetizers(menuItems.filter(item => item.category === "Appetizers"));
                    setBeverages(menuItems.filter(item => item.category === "Beverages"));
                    setDesserts(menuItems.filter(item => item.category === "Desserts"));
                } else {
                    throw new Error('Unexpected data format: menuItems is not an array');
                }

            } catch (error) {
                console.error('Error fetching menu items:', error.response ? error.response.data : error.message);
                setError(error.message || 'Failed to fetch menu items');
            }
        };

        fetchMenuItems();
    }, []); // Empty dependency array means this runs once on mount

    // Render function
    return (
        <div className="menu-container">
            <h1>Our Menu</h1>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            <div className="category">
                <h2>Starters</h2>
                <div className="menu-items">
                    {starters.map((item) => (
                        <div key={item._id} className="menu-item">
                            <img src={item.image} alt={item.name} className="menu-img" />
                            <div className="menu-details">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p className="category-menu">{item.category}</p>
                                <p className="price">${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="category">
                <h2>Main Course</h2>
                <div className="menu-items">
                    {mainCourses.map((item) => (
                        <div key={item._id} className="menu-item">
                            <img src={item.image} alt={item.name} className="menu-img" />
                            <div className="menu-details">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p className="category-menu">{item.category}</p>
                                <p className="price">${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="category">
                <h2>Appetizers</h2>
                <div className="menu-items">
                    {appetizers.map((item) => (
                        <div key={item._id} className="menu-item">
                            <img src={item.image} alt={item.name} className="menu-img" />
                            <div className="menu-details">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p className="category-menu">{item.category}</p>
                                <p className="price">${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="category">
                <h2>Beverages</h2>
                <div className="menu-items">
                    {beverages.map((item) => (
                        <div key={item._id} className="menu-item">
                            <img src={item.image} alt={item.name} className="menu-img" />
                            <div className="menu-details">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p className="category-menu">{item.category}</p>
                                <p className="price">${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="category">
                <h2>Desserts</h2>
                <div className="menu-items">
                    {desserts.map((item) => (
                        <div key={item._id} className="menu-item">
                            <img src={item.image} alt={item.name} className="menu-img" />
                            <div className="menu-details">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p className="category-menu">{item.category}</p>
                                <p className="price">${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Menu;