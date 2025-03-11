import React, { useState, useEffect } from 'react';
import eat1 from '../assets/eat1.jpeg';
import { FaBurger } from "react-icons/fa6";
import { FaWineGlass } from 'react-icons/fa';
import { FaIceCream } from 'react-icons/fa';
import { FaPizzaSlice } from "react-icons/fa6";
import { FaSun, FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import food2 from '../assets/food2.webp';
import food3 from '../assets/food3.webp';
import food4 from '../assets/food4.webp';
import food5 from '../assets/food5.webp';
import food6 from '../assets/food6.jpeg';
import food11 from '../assets/food11.webp';
import food12 from '../assets/food12.webp';
import food13 from '../assets/food13.webp';
import food14 from '../assets/food14.webp';
import food15 from '../assets/food15.webp';
import food16 from '../assets/food16.jpeg';
import food17 from '../assets/food17.webp';
import '../Styles/Home.css';

function Home() {
  const [cart, setCart] = useState([]); // Create cart state
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  const popularDishes = [
    { index: 1, img: food17, name: "Spaghetti Carbonara", description: "A classic Italian pasta dish...", price: 12.99 },
    { index: 2, img: food2, name: "Margherita Pizza", description: "A simple pizza with tomato sauce...", price: 10.49 },
    { index: 3, img: food3, name: "Grilled Salmon", description: "Fresh salmon fillets grilled...", price: 18.99 },
    { index: 4, img: food4, name: "Caesar Salad", description: "A classic salad with romaine lettuce...", price: 8.99 },
    { index: 5, img: food5, name: "Chicken Tikka Masala", description: "Tender chicken cooked in a flavorful curry...", price: 14.99 },
    { index: 6, img: food6, name: "Vegetable Stir Fry", description: "A healthy mix of vegetables stir-fried...", price: 11.49 },
    { index: 7, img: food13, name: "Beef Burger", description: "A juicy beef patty served on a soft bun...", price: 9.99 },
    { index: 8, img: food14, name: "Chocolate Lava Cake", description: "A rich chocolate cake with molten center...", price: 6.99 },
    { index: 9, img: food15, name: "Chicken Caesar Wrap", description: "Grilled chicken wrapped in a tortilla...", price: 7.99 },
    { index: 10, img: food16, name: "Penne Arrabbiata", description: "Penne pasta in a spicy tomato sauce...", price: 13.49 },
    { index: 11, img: food11, name: "Vegetable Sushi", description: "Fresh vegetables wrapped in rice ...", price: 8.99 },
    { index: 12, img: food12, name: "Tiramisu", description: "A classic Italian dessert made with ...", price: 5.99 },
  ];

  // Function to handle adding items to the cart
  const handleAddToCart = (dish) => {
    setCart((prevCart) => [...prevCart, dish]);
    // Scroll to the bottom of the page where the cart is located
    window.scrollTo(0, document.body.scrollHeight);
  };

  // Function to handle removing an item from the cart
  const handleRemoveFromCart = (dishIndex) => {
    setCart((prevCart) => prevCart.filter((item, index) => index !== dishIndex));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`home-real-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="home-container">
        <div className="home-part1">
          <h3>Welcome to DineMate</h3>
          <br />
          <p>Dine Effortlessly, Order Instantly.</p>
        </div>
      
        <div className="home-image"><img src={eat1} alt="Dining" /></div>
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
        {popularDishes.map((dish) => (
          <div key={dish.index} className="dish-item">
            <img src={dish.img} alt={dish.name} className="dish-img" />
            <h3 className="dish-name">{dish.name}</h3>
            <p className="dish-description">{dish.description}</p>
            <p className="dish-price">${dish.price.toFixed(2)}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(dish)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="cart-section">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img" />
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <button 
                  className="remove-from-cart-btn"
                  onClick={() => handleRemoveFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <p>Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
          </div>
        )}
      </div>

      {/* Dark Mode Toggle */}
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? <FaSun className="icon" /> : <FaMoon className="icon" />}
      </div>
    </div>
  );
}

export default Home;